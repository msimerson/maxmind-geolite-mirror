'use strict';

const assert = require('assert');
const rewire = require('rewire');

let config   = rewire('../lib/config');

describe('config', () => {
    it('has dbDir', () => {
        assert.ok(config.dbDir);
    });

    it('has custom dbDir', function() {
        const expected = '/foo/bar';
        process.env.MAXMIND_DB_DIR = expected;

        config = rewire('../lib/config');

        assert.equal(config.dbDir, expected);
        delete process.env.MAXMIND_DB_DIR;
    })

    it('license defined in ENV', function() {
        process.env.MAXMIND_LICENSE_KEY = 'test';

        config = rewire('../lib/config');

        assert.equal(config.license_key, 'test');
        delete process.env.MAXMIND_LICENSE_KEY;
    })

    it('has geoIpDbs', () => {
        assert.ok(config.geoIpDbs);
    })

    it('has UserAgent', () => {
        assert.ok(config.userAgent);
    })

    it('has hostName', () => {
        assert.ok(config.hostName);
    })

    it('has urlPath', () => {
        assert.ok(config.urlPath);
    })
})
