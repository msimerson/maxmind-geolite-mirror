'use strict';

// where your GeoIP databases are stored
exports.dbDir = process.env.MAXMIND_DB_DIR || '/usr/local/share/GeoIP/';

// your MaxMind license key, this is REQUIRED!
exports.license_key = '';
if (process.env.MAXMIND_LICENSE_KEY && exports.license_key === '') {
    exports.license_key = process.env.MAXMIND_LICENSE_KEY;
}

// the download site to fetch DBs from
exports.hostName    = 'download.maxmind.com';
exports.urlPath     = '/app/geoip_download';
exports.userAgent   = 'MaxMind-geolite-mirror-simple/0.0.4';

//               local-filename              geolite-name
exports.geoIpDbs = [
    // v1
    // { local: 'GeoIP.dat',        remote: 'GeoLiteCountry/GeoIP.dat.gz' },
    // { local: 'GeoIPCity.dat',    remote: 'GeoLiteCity.dat.gz' },
    // { local: 'GeoIPCityv6.dat',  remote: 'GeoLiteCityv6-beta/GeoLiteCityv6.dat.gz' },
    // { local: 'GeoIPv6.dat',      remote: 'GeoIPv6.dat.gz' },
    // { local: 'GeoIPASNum.dat',   remote: 'asnum/GeoIPASNum.dat.gz' },
    // { local: 'GeoIPASNumv6.dat', remote: 'asnum/GeoIPASNumv6.dat.gz' },

    // v2
    { local: 'GeoLite2-Country.mmdb', remote: 'GeoLite2-Country' },
    { local: 'GeoLite2-City.mmdb',    remote: 'GeoLite2-City' },
    { local: 'GeoLite2-ASN.mmdb',     remote: 'GeoLite2-ASN' },
];
