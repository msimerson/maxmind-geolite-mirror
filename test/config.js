'use strict';

var assert = require('assert');
var rewire = require('rewire');

var config = rewire('../lib/config');

describe('config', function () {
    it('has dbDir', function () {
        assert.ok(config.dbDir);
    });

    it('has custom dbDir', function() {
        var expected = '/foo/bar';
        process.env.MAXMIND_DB_DIR = expected;

        config = rewire('../lib/config');

        assert.equal(config.dbDir, expected);
        delete process.env.MAXMIND_DB_DIR;
    });

    it('has geoIpDbs', function () {
        assert.ok(config.geoIpDbs);
    });

    it('has UserAgent', function () {
        assert.ok(config.userAgent);
    });

    it('has hostName', function () {
        assert.ok(config.hostName);
    });

    it('has hostPort', function () {
        assert.ok(config.hostPort);
    });

    it('has urlPath', function () {
        assert.ok(config.urlPath);
    });
});
