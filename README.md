This is a simple client and server designed to be deployed to PCF and create load between the two applications.


## Client

An HTTP client using the [loadtest](https://www.npmjs.com/package/loadtest) Node.js library that sends a `POST` to a specific endpoint.  Can be run locally via `npm start` or deployed to PCF.  Has a number of configurable options that can be configured via a `manifest.yml` or via `env` variables.

### Configuring options

In your `manifest.yml`:
```
---
applications:
- name: nodeclient
  health-check-type: process
  memory: 128M
  disk_quota: 128M
  no-route: true
  env:
    #options go here
    endpoint: http://nodeserver.apps.nsx.home.local
```

`endpoint`: The endpoint that you want to loadtest from the client.  Default: `http://google.com`

`maxRequests`: The number of requests to execute before terminating the load test.  Default: uncapped

`rps`: The number of requests per second to target.  Default: `50rps`

## Server

An HTTP server that accepts a `GET` or a `POST` on the root context.  Can be deployed to PCF or run locally on TCP 8080 with `NPM start` or `node index.js`.

`GET`: Returns an HTTP status code 200 and the string "Got it!"
`POST`: Logs the POST body and returns an HTTP status code 200.