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

## Custom path to store maxmind database
If access to /usr/local/share/GeoIP is unavailable, the following environment
variable is available: MAXMIND_DB_DIR. E.g.

    export MAXMIND_DB_DIR=/home/example/maxmind-db


## Contributions

Contributions are welcome, especially if they include tests and are in the form of squashed GitHub Pull Requests.

### How to squash:

````sh
git remote add msimerson https://github.com/msimerson/maxmind-geolite-mirror.git
git rebase -i msimerson/master
````

Then change `pick` to `s` for all but the first commit and save changes. Then force push the squashed branch to your repo:

````sh
git push -f origin
````


[ci-image]: https://travis-ci.org/msimerson/maxmind-geolite-mirror.svg
[ci-url]:  https://travis-ci.org/msimerson/maxmind-geolite-mirror
[dep-img]: https://david-dm.org/msimerson/maxmind-geolite-mirror.svg
[dep-url]: https://david-dm.org/msimerson/maxmind-geolite-mirror
[cov-img]: https://coveralls.io/repos/msimerson/maxmind-geolite-mirror/badge.svg
[cov-url]: https://coveralls.io/r/msimerson/maxmind-geolite-mirror
[npm-image]: https://nodei.co/npm/maxmind-geolite-mirror.png?downloads=true&stars=true
[npm-url]: https://nodei.co/npm/maxmind-geolite-mirror/
[win-ci-img]: https://ci.appveyor.com/api/projects/status/1e2vtbq1ekfvvwl7/branch/master?svg=true
[win-ci-url]: https://ci.appveyor.com/project/msimerson/maxmind-geolite-mirror/branch/master
