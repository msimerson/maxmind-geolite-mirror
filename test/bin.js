'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const assert = require('assert');
const tmp = require('tmp');

describe('maxmind-geolite-mirror', () => {
    it('can be required', (done) => {
        const tmpDir = tmp.dirSync({ unsafeCleanup: true });
        process.env.MAXMIND_DB_DIR = tmpDir.name;
        const fetcher = require('../bin/maxmind-geolite-mirror');
        assert.ok(fetcher);
        fetcher.main( (err) => {
            assert.ok(!err);
            tmpDir.removeCallback();
            done();
        });
    }).timeout(60000);

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
        const tmpDir = tmp.dirSync({ unsafeCleanup: true });
        const fetcher = require('../bin/maxmind-geolite-mirror').download;
        const outfile = path.join(tmpDir.name, `sample-1.mmdb`);
        fetcher(outfile, { path: path.join(__dirname, 'fixtures', 'sample.mmdb.gz')}, (err) => {
            assert.equal(fs.readFileSync(outfile).toString().trim(), 'success');
            tmpDir.removeCallback();
            done(err);
        });
    });

    it('can handle tarball', (done) => {
        const tmpDir = tmp.dirSync({ unsafeCleanup: true });
        const fetcher = require('../bin/maxmind-geolite-mirror').download;
        const outfile = path.join(tmpDir.name, `sample-2.mmdb`);
        fetcher(outfile, { path: path.join(__dirname, 'fixtures', 'sample.tar.gz')}, (err) => {
            assert.equal(fs.readFileSync(outfile).toString().trim(), 'success');
            tmpDir.removeCallback();
            done(err);
        });
    });

    it('can handle multi-mmdb tarball', (done) => {
        const tmpDir = tmp.dirSync({ unsafeCleanup: true });
        const fetcher = require('../bin/maxmind-geolite-mirror').download;
        const outfile = path.join(tmpDir.name, `sample-3.mmdb`);
        fetcher(outfile, { path: path.join(__dirname, 'fixtures', 'sample-multi.tar.gz')}, (err) => {
            assert.equal(fs.readFileSync(outfile).toString().trim(), 'success');
            tmpDir.removeCallback();
            done(err);
        });
    });
});