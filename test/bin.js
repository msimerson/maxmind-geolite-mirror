'use strict';

var assert = require('assert');

describe('maxmind-geolite-mirror', function () {
    it('can be required', function () {
        var fetcher = require('../bin/maxmind-geolite-mirror');
        assert.ok(fetcher);
    });
});

