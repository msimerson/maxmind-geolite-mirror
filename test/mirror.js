'use strict';

const fs     = require('fs');
const https  = require('https');
const path   = require('path');
const assert = require('assert');
const tmp    = require('tmp');

const config = require('../lib/config');
const mirror = require('../lib/mm-geolite-mirror');
const reqArgs = {
    protocol: 'https:',
    hostname: config.hostName,
}

describe('maxmind-geolite-mirror', () => {
    it('httpReqOpts', (done) => {
        const opts = mirror.httpReqOpts(reqArgs);
        assert.equal(opts.method, 'HEAD');
        assert.equal(opts.hostname, config.hostName);
        assert.equal(opts.headers['User-Agent'], config.userAgent);
        assert.ok(!opts.agent);
        done();
    })

    it('detects unchanged files with isRemoteNewer', (done) => {
        // stub request to deliver a 304
        https.request = (opts, callback) => {
            const res = { statusCode: 304 };
            callback(res);
            return { on: () => { return { end: () => {} } } }; // stub method chaining
        };

        mirror.isRemoteNewer(path.join(__dirname, 'fixtures', 'sample.mmdb.gz'), { headers: {} }, (result) => {
            assert.equal(result, false);
            done();
        })
    })

    it('detects changed files with isRemoteNewer', (done) => {
        // stub request to deliver a 200
        https.request = (opts, callback) => {
            const res = { statusCode: 200 };
            callback(res);
            return { on: () => { return { end: () => {} } } }; // stub method chaining
        };

        mirror.isRemoteNewer(path.join(__dirname, 'fixtures', 'sample.mmdb.gz'), { headers: {} }, (result) => {
            assert.equal(result, true);
            done();
        });
    })

    it('can stub http.request for remaining tests', () => {
        // stub request to handle local files
        https.request = (opts, callback) => {
            const res = fs.createReadStream(opts.path);
            res.statusCode = 200;
            callback(res);
            return { on: () => { return { end: () => {} } } }; // stub method chaining
        };
    })

    it('can handle gzip', (done) => {
        const tmpDir = tmp.dirSync({ unsafeCleanup: true });
        const outfile = path.join(tmpDir.name, `sample-1.mmdb`);
        mirror.download(outfile, { path: path.join(__dirname, 'fixtures', 'sample.mmdb.gz')}, (err) => {
            assert.equal(fs.readFileSync(outfile).toString().trim(), 'success');
            tmpDir.removeCallback();
            done(err);
        });
    })

    it('can handle tarball', (done) => {
        const tmpDir = tmp.dirSync({ unsafeCleanup: true });
        const outfile = path.join(tmpDir.name, `sample-2.mmdb`);
        mirror.download(outfile, { path: path.join(__dirname, 'fixtures', 'sample.tar.gz')}, (err) => {
            assert.equal(fs.readFileSync(outfile).toString().trim(), 'success');
            tmpDir.removeCallback();
            done(err);
        });
    })

    it('can handle multi-mmdb tarball', (done) => {
        const tmpDir = tmp.dirSync({ unsafeCleanup: true });
        const outfile = path.join(tmpDir.name, `sample-3.mmdb`);
        mirror.download(outfile, { path: path.join(__dirname, 'fixtures', 'sample-multi.tar.gz')}, (err) => {
            assert.equal(fs.readFileSync(outfile).toString().trim(), 'success');
            tmpDir.removeCallback();
            done(err);
        });
    })

    it('can run doOne', (done) => {
        const tmpDir = tmp.dirSync({ unsafeCleanup: true });
        config.dbDir = `${tmpDir.name}/`;
        config.urlPath = `${path.join(__dirname, 'fixtures')}/`;
        const item = { local: 'doOne-output.mmdb', remote: 'sample.mmdb.gz'};
        mirror.doOne(item, (err) => {
            assert.equal(fs.readFileSync(path.join(config.dbDir, 'doOne-output.mmdb')).toString().trim(), 'success');
            tmpDir.removeCallback();
            done(err);
        });
    })
})
