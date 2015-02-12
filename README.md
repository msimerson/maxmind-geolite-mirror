[![Build Status][ci-image]][ci-url]
[![Dependencies][dep-img]][dep-url]
[![Coverage Status][cov-img]][cov-url]
[![WinCI status][win-ci-img]][win-ci-url]

[![NPM][npm-image]][npm-url]

# maxmind-geolite-mirror

Mirror maxmind GeoIP databases from geolite.maxmind.com


## Install

    npm install -g maxmind-geolite-mirror
    mkdir -p /usr/local/share/GeoIP
    /usr/local/bin/maxmind-geolite-mirror

The last command will download all the databases to the GeoIP share directory.

## Update databases

    /usr/local/bin/maxmind-geolite-mirror

Set this to run once a week or so. Downloads will only happen if the remote
file is newer than the local version.


[ci-image]: https://travis-ci.org/msimerson/maxmind-geolite-mirror.svg
[ci-url]:  https://travis-ci.org/msimerson/maxmind-geolite-mirror
[dep-img]: https://david-dm.org/msimerson/maxmind-geolite-mirror.svg
[dep-url]: https://david-dm.org/msimerson/maxmind-geolite-mirror
[cov-img]: https://coveralls.io/repos/msimerson/maxmind-geolite-mirror/badge.svg
[cov-url]: https://coveralls.io/r/msimerson/maxmind-geolite-mirror
[npm-image]: https://nodei.co/npm/maxmind-geolite-mirror.png?downloads=true&stars=true
[npm-url]: https://nodei.co/npm/maxmind-geolite-mirror/
[win-ci-img]: https://ci.appveyor.com/api/projects/status/uhej33x4x1tcd79r?svg=true
[win-ci-url]: https://ci.appveyor.com/project/msimerson/node-address-rfc2821
