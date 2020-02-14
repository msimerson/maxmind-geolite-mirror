'use strict';

const fs    = require('fs');
const https = require('https');
const path  = require('path');
const url   = require('url');
const zlib  = require('zlib');

const config = require('../lib/config');
const con    = require('../lib/console');

function httpReqOpts (uri) {
    return {
        method: 'HEAD',
        hostname: uri.hostname,
        protocol: uri.protocol,
        headers: {
            'User-Agent': config.userAgent,
        },
        agent: false,
    };
}

function isRemoteNewer (dest, httpOpts, done) {

    if (!fs.existsSync(dest)) {
        // con.log(`${dest} does not exist`);
        return done(true);
    }

    const stats = fs.statSync(dest);
    if (!stats.isFile()) {
        con.error(`${dest} is not a file`);
        fs.unlink(dest, () => {
            con.log(`${dest} deleted`);
            return done(true);
        })
    }

    httpOpts.headers['If-Modified-Since'] = stats.mtime.toUTCString();

    const request = https.request(httpOpts, (res) => {

        if (res.statusCode === 304) {
            con.log(`${dest} is up-to-date`);
            return done(false);
        }

        if (res.statusCode === 200) return done(true);

        if (res.statusCode === 404) {
            con.log(`404 not found for ${dest}`);
            done(false);
            return;
        }

        con.log(res.statusCode);
        con.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        done(true);
    })
        .on('error', (e) => {
            con.error(e);
            done(false);
        });

    request.end();
}

function expandTarball (dest, res, callback) {
    let untar = null;
    try {
        untar = require('tar-stream').extract();
    }
    catch (err) {
        callback(`cannot open ${res.path}, tar-stream package is not available.`);
        return;
    }

    let foundFile = false;
    untar.on('entry', (header, stream, cb) => {
        if (!/\.mmdb$/.test(header.name)) return cb();

        // use dest for first matching filename; warn & drop files for subsequent matches
        if (foundFile) {
            con.error(`WARNING: encountered more than one mmdb file in .tar.gz. Saving first match (${foundFile}) as ${dest}.`);
            return cb();
        }

        const outstream = fs.createWriteStream(`${dest}.tmp`);
        outstream.on('finish', () => { fs.rename(`${dest}.tmp`, dest, cb); })
        stream.pipe(outstream);
        foundFile = header.name;
    })

    untar.on('finish', callback);

    res.pipe(zlib.createGunzip()).pipe(untar);
}

function download (dest, opts, done) {

    const request = https.request(opts, (res) => {
        if (res.statusCode !== 200) {
            con.error(`HEADERS: ${JSON.stringify(res.headers)}`);
            return done(`response code ${res.statusCode} not handled!`);
        }

        // As of 1/1/2020 the .tar.gz extension has been removed.
        expandTarball(dest, res, done)
    })
        .on('error', (e) => {
            con.error(e);
            fs.unlink(dest, () => {
            // unlikely the file exists. In the general case, this
            // callback catches the error and...ignores it.
            })
            done(`err: ${e.message}`);
        })

    request.end();
}

function doOne (item, done) {

    if (!config.license_key && !process.env.MM_TESTING) {
        return done(`missing license_key in ${path.resolve(__dirname, 'config.js')}!`);
    }

    const requestUrl = new URL(url.format({
        protocol: 'https',
        hostname: config.hostName,
        pathname: config.urlPath,
        query: {
            license_key: config.license_key,
            suffix: 'tar.gz',
            edition_id: item.remote,
        }
    }))

    const opts = new httpReqOpts(requestUrl);
    if (process.env.MM_TESTING) {
        opts.path = `${config.urlPath}${item.remote}`
    }
    else {
        opts.path = `${requestUrl.pathname}${requestUrl.search}`;
    }
    const dest = `${config.dbDir}${item.local}`;

    isRemoteNewer(dest, opts, (shouldGet) => {
        if (!shouldGet) return done();

        con.log(`downloading ${dest}`);
        opts.method = 'GET';
        download(dest, opts, done);
    })
}

module.exports = {
    httpReqOpts: httpReqOpts,
    download: download,
    isRemoteNewer: isRemoteNewer,
    doOne: doOne
}
