[![Build Status](https://travis-ci.org/msimerson/maxmind-geolite-mirror.svg)](https://travis-ci.org/msimerson/maxmind-geolite-mirror)

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
