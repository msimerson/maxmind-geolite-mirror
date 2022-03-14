
### 1.1.8 - 2022-03-14

- update CI images (goes with 1.1.7)


### 1.1.7 - 2021-09-24

- switch CI to GHA


### 1.1.6 - 2020-02-13

- expand archives, despite new URL format w/o extension


### 1.1.5 - 2020-01-14

- permit license key to be stored in ENV variable #34


### 1.1.4 - 2020-01-14

- updated to use MaxMind license key (see #32)


### 1.1.3 - 2019-02-20

- remove v1 .dat files from config, MaxMind no longer publishing


### 1.1.2 - 2019-01-29

- pass errors via cb (vs ignore or throw)
- more conversion to es6 template strings


### 1.1.1 - 2019-01-09

- remove geoip DBs no longer served by MM
- test node.js v10 (had 9)
- some es6 updates
- handle 404 errors (fixes #21)
- bump version of tar-stream to 1.6.2


### 1.1.0 - 2018-03-23

- Expand test system & move fully offline
- Move most code into `lib/mm-geolite-mirror.js`, reduce `bin/maxmind-geolite-mirror` surface
- Support node 4 again via `use strict`
- Fix bugs in `.tar.gz` handling


### 1.0.9 - 2018-03-19

- add geolite2-ASN db to list (from #16 by Tom Lee)
- sprinkle in some ES6 syntax
- drop node 4 testing, add node 9


### 1.0.7 - 2016-07-20

- added geolite2 databases to DB list


### 1.0.6 - 2016-04-05

- added Contributors to README
- suppress error when attempting to delete a file that failed to download


### 1.0.5 - 2015-06-23  @msimerson

- enable testing on node 0.12 (remove 0.11)
- move dev docs to DEVELOP.md
- demote non-working badges to bottom of README


### 1.0.4 - 2015-06-23  @cbanbury

- allow configurable db dir with MAXMIND_DB_DIR
