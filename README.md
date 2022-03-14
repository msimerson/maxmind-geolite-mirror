[![Build Status][ci-image]][ci-url]
[![Coverage Status][cov-img]][cov-url]
[![NPM][npm-image]][npm-url]


# maxmind-geolite-mirror

Mirror maxmind GeoIP version 2 databases from maxmind.com.

## Install

    npm install -g maxmind-geolite-mirror
    mkdir -p /usr/local/share/GeoIP
    /usr/local/bin/maxmind-geolite-mirror

The last command will download all the databases to the GeoIP share directory.

## Configure

The MaxMind license key must be configured. It can be set by:

1. editing config.js
2. setting the environment variable MAXMIND_LICENSE_KEY

If neither is set, the script will emit an error.

## Update databases

    /usr/local/bin/maxmind-geolite-mirror

Set this to run once a week or so. Downloads happen only when the remote
file is newer than the local version.

## Custom path to store maxmind database

If access to /usr/local/share/GeoIP is unavailable, the following environment
variable is available: MAXMIND_DB_DIR. E.g.

    export MAXMIND_DB_DIR=/home/example/maxmind-db


## Contributions

Contributions are welcome and appreciated. Please keep in mind the following:

* there are no dependencies. That's on purpose.
* test coverage is at 100%, help keep it that way.


### Contributors

- Carl Banbury
- Tom Lee

### badges

[ci-image]: https://github.com/msimerson/maxmind-geolite-mirror/actions/workflows/ci-test.yml/badge.svg
[ci-url]:  https://github.com/msimerson/maxmind-geolite-mirror/actions/workflows/ci-test.yml
[cov-img]: https://codecov.io/github/msimerson/maxmind-geolite-mirror/coverage.svg?branch=master
[cov-url]: https://codecov.io/github/msimerson/maxmind-geolite-mirror?branch=master
[npm-image]: https://nodei.co/npm/maxmind-geolite-mirror.png?downloads=true&stars=true
[npm-url]: https://nodei.co/npm/maxmind-geolite-mirror/
