[![Build Status][ci-image]][ci-url]
[![Coverage Status][cov-img]][cov-url]
[![WinCI status][win-ci-img]][win-ci-url]
[![Dependencies][dep-img]][dep-url]


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

If neither is set, the script will emit an error prompting you to edit config.js.

## Update databases

    /usr/local/bin/maxmind-geolite-mirror

Set this to run once a week or so. Downloads will only happen if the remote
file is newer than the local version.

## Custom path to store maxmind database

If access to /usr/local/share/GeoIP is unavailable, the following environment
variable is available: MAXMIND_DB_DIR. E.g.

    export MAXMIND_DB_DIR=/home/example/maxmind-db


## Contributions

Contributions are welcome, especially if they include tests. See [DEVELOP.md](DEVELOP.md)


### Contributors

- Carl Banbury

### badges

[![NPM][npm-image]][npm-url]


[ci-image]: https://travis-ci.org/msimerson/maxmind-geolite-mirror.svg
[ci-url]:  https://travis-ci.org/msimerson/maxmind-geolite-mirror
[dep-img]: https://david-dm.org/msimerson/maxmind-geolite-mirror.svg
[dep-url]: https://david-dm.org/msimerson/maxmind-geolite-mirror
[cov-img]: https://codecov.io/github/msimerson/maxmind-geolite-mirror/coverage.svg?branch=master
[cov-url]: https://codecov.io/github/msimerson/maxmind-geolite-mirror?branch=master
[npm-image]: https://nodei.co/npm/maxmind-geolite-mirror.png?downloads=true&stars=true
[npm-url]: https://nodei.co/npm/maxmind-geolite-mirror/
[win-ci-img]: https://ci.appveyor.com/api/projects/status/1e2vtbq1ekfvvwl7/branch/master?svg=true
[win-ci-url]: https://ci.appveyor.com/project/msimerson/maxmind-geolite-mirror/branch/master
