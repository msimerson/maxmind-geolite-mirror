#!/usr/local/bin/node
'use strict';

var fs    = require('fs');
var http  = require('http');
var util  = require('util');
var zlib  = require('zlib');

var dbDir = '/usr/local/share/GeoIP/';

//               local-filename              geolite-name
var geoIpDbs = [
    { local: 'GeoIP.dat',        remote: 'GeoLiteCountry/GeoIP.dat.gz' },
    { local: 'GeoIPCity.dat',    remote: 'GeoLiteCity.dat.gz' },
    { local: 'GeoIPCityv6.dat',  remote: 'GeoLiteCityv6-beta/GeoLiteCityv6.dat.gz' },
    { local: 'GeoIPv6.dat',      remote: 'GeoIPv6.dat.gz' },
    { local: 'GeoIPASNum.dat',   remote: 'asnum/GeoIPASNum.dat.gz' },
    { local: 'GeoIPASNumv6.dat', remote: 'asnum/GeoIPASNumv6.dat.gz' },
];

var httpReqOpts = function () {
    return {
        method: 'HEAD',
        path: '/download/geoip/database/',
        hostname: 'geolite.maxmind.com',
        port: 80,
        headers: {
            'User-Agent': 'MaxMind-geolite-mirror-simple/0.0.3',
        },
        agent: false,
    }
};

var isRemoteNewer = function (dest, httpOpts, done) {

    if (!fs.existsSync(dest)) {
        // console.log(dest + ' does not exist');
        return done(true);
    }

    var stats = fs.statSync(dest);
    if (!stats.isFile()) {
        console.error(dest + ' is not a file');
        fs.unlink(dest, function () {
            console.log(dest + ' deleted');
            return done(true);
        });
    }

    httpOpts.headers['If-Modified-Since'] = stats.mtime.toUTCString();

    var request = http.request(httpOpts, function (res) {
        if (res.statusCode === 304) {
            console.log(dest + ' is up-to-date');
            return done(false);
        }
        if (res.statusCode === 200) {
            return done(true);
        }
        console.log(res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        done(true);
    })
    .on('error', function (e) {
        console.error(e);
        done(false);
    });
    request.end();
};

var download = function(dest, opts, done) {

    var request = http.request(opts, function (res) {
        if (res.statusCode === 200) {
            var file = fs.createWriteStream(dest + '.tmp');
            res.pipe(zlib.createGunzip()).pipe(file);
            file.on('finish', function () {
                // console.log("wrote to file " + dest + '.tmp');
                file.close(function (err) {
                    if (err) throw err;
                    // console.log("moved " + dest + '.tmp to ' + dest);
                    fs.rename(dest + '.tmp', dest, function (err) {
                        if (err) throw err;
                        console.log('saved ' + dest);
                        done();
                    });
                });
            });
            return;
        }
        console.error('response code ' + res.statusCode + ' not handled!');
        console.error('HEADERS: ' + JSON.stringify(res.headers));
    })
    .on('error', function (e) {
        console.error(e);
        fs.unlink(dest);
        if (done) done('err: ' + err.message);
    });

    request.end();
};

var doOne = function (item, done) {

    var opts = new httpReqOpts;
        opts.path = opts.path + item.remote;

    var dest = dbDir  + item.local;

    isRemoteNewer(dest, opts, function (shouldGet) {
        if (!shouldGet) return done();

        console.log('downloading ' + dest);
        opts.method = 'GET';
        download(dest, opts, done);
    });
};

// check each file, in series (poor mans async.eachSeries)
doOne(geoIpDbs.shift(), function iterator () {
    if (!geoIpDbs.length) return;
    doOne(geoIpDbs.shift(), iterator);
});
