const loadtest = require('loadtest');
var cfenv = require("cfenv")
const opentracing = require('opentracing');
const tracer = new opentracing.Tracer();

const span = tracer.startSpan('http_request');

var appEnv = cfenv.getAppEnv()

function getParams() {
    var endpoint = process.env.endpoint ? process.env.endpoint : 'http://google.com';
    var maxRequests = process.env.maxRequests ? process.env.maxRequests : null;
    var rps = process.env.rps ? process.env.rps : 50;
    return { endpoint: endpoint, maxRequests: maxRequests, rps: rps }
}

function statusCallback(error, result, latency) {
    console.log('Current latency %j, result %j, error %j', latency, result, error);
    console.log('----');
    console.log('Request elapsed milliseconds: ', result.requestElapsed);
    console.log('Request index: ', result.requestIndex);
    console.log('Request loadtest() instance index: ', result.instanceIndex);
}

const options = {
    url: getParams().endpoint,
    maxRequests: getParams().maxRequests,
    insecure: true,
    requestsPerSecond: getParams().rps,
    method: 'POST',
    body: '',
    statusCallback: statusCallback,
    requestGenerator: (params, options, client, callback) => {
        const message = '{"Message"}';
        options.headers['Content-Length'] = message.length;
        options.headers['Content-Type'] = 'text/plain';
        options.body = 'Data';
        options.path = '/';
        const request = client(options, callback);
        request.write(message);
        return request;
    }
};

console.log("endpoint: " + getParams().endpoint)
console.log("maxRequsts: " + getParams().maxRequests)



loadtest.loadTest(options, function (error, result) {
    if (error) {
        return console.error('Got an error: %s', error);
    }
    console.log(result)
    console.log('Tests run successfully');
});