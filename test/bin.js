'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const assert = require('assert');

function makeTempDir() {
    try {
        // put artifacts in temp directory when possible
        return require('tmp').dirSync({ unsafeCleanup: true });
    }
    catch (err) {
        return { name: '/tmp', removeCallback: () => {} };
    }
}

describe('maxmind-geolite-mirror', () => {
    const timestamp = +new Date();

    it('can be required', () => {
        const tmpDir = makeTempDir();
        process.env.MAXMIND_DB_DIR = tmpDir.name;
        const fetcher = require('../bin/maxmind-geolite-mirror');
        assert.ok(fetcher);
        tmpDir.removeCallback();
    });

    it('can stub http.request', () => {
        // stub request to handle local files
        http.request = (opts, callback) => {
            const res = fs.createReadStream(opts.path);
            res.statusCode = 200;
            callback(res);
            return { on: () => { return { end: () => {} } } }; // stub method chaining
        };
    });

    it('can handle gzip', (done) => {
        const tmpDir = makeTempDir();
        const fetcher = require('../bin/maxmind-geolite-mirror');
        const outfile = path.join(tmpDir.name, `sample-${timestamp}-1.mmdb`);
        fetcher(outfile, { path: path.join(__dirname, 'fixtures', 'sample.mmdb.gz')}, (err) => {
            assert.equal(fs.readFileSync(outfile).toString().trim(), 'success');
            tmpDir.removeCallback();
            done(err);
        });
    });

    it('can handle tarball', (done) => {
        const tmpDir = makeTempDir();
        const fetcher = require('../bin/maxmind-geolite-mirror');
        const outfile = path.join(tmpDir.name, `sample-${timestamp}-2.mmdb`);
        fetcher(outfile, { path: path.join(__dirname, 'fixtures', 'sample.tar.gz')}, (err) => {
            assert.equal(fs.readFileSync(outfile).toString().trim(), 'success');
            tmpDir.removeCallback();
            done(err);
        });
    });

    it('can handle multi-mmdb tarball', (done) => {
        const tmpDir = makeTempDir();
        const fetcher = require('../bin/maxmind-geolite-mirror');
        const outfile = path.join(tmpDir.name, `sample-${timestamp}-3.mmdb`);
        fetcher(outfile, { path: path.join(__dirname, 'fixtures', 'sample-multi.tar.gz')}, (err) => {
            assert.equal(fs.readFileSync(outfile).toString().trim(), 'success');
            tmpDir.removeCallback();
            done(err);
        });
    });
});