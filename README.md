# mark_beaman_TL

## Installation
```
Install Node: https://nodejs.org/en/download/
```

## Project Setup
In terminal, navigate to project root folder, then type:
```
npm install
```

## Run your end-to-end tests
```
npm run cypress-open
```
execute tests via GUI and select 1 or many tests to run
```
npm run cypress-run -- --spec tests/integration/v1/*.js
```
execute tests (run in background) runs all v1 api tests
```
npm run cypress-run -- --spec tests/integration/rate_limiter.js
```
execute tests (run in background) runs only rate limiter (more info in Issues section)

## Github-CI end-to-end tests
```
https://github.com/markbeaman44/mark_beaman_TL/actions/workflows/main.yml
```
It executes all test scenario - minus rate limiter. (more info in Issues section)

One test will fail due to `limit 10 per request` as it give status 200 on limit 11 (more info in Issues section)

## Lints and fixes files
```
npm run lint
```

## Notes
Ideally the rate limiter test would be mocked with lower number, to make execution faster for completiton.

Also to prevent it from impacting on real apis (429), tests would fail until 350 limiter refresh.

Currently why rate_limiter.js is its own execution command.


## Issues
`satellites/ GET Request`

Contains only 1 id within list, would have been good to have additional - for test range.

or PUT to update existing data

or POST to add new data


In documentation the example response data is a little off with some values


`satellites/[id]/positions`


Says `timestamps	Specify a comma delimited list of timestamps for orbital positions, limit 10 per request`,

but it can go above 10 - so either the limit is not set correctly or the documentation is wrong.

Thats why a single test failed - due to incorrect status code.
