
const assert = require('assert');

describe('maxmind-geolite-mirror', () => {
    it('can be required', () => {
        const fetcher = require('../bin/maxmind-geolite-mirror');
        assert.ok(fetcher);
    })
})

