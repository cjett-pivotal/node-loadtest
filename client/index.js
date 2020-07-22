const loadtest = require('loadtest');
var cfenv = require("cfenv")

var appEnv = cfenv.getAppEnv()

function getParams(){
    var endpoint = process.env.endpoint ? process.env.endpoint : 'http://google.com';
    var maxRequests = process.env.maxRequests? process.env.maxRequests : null;
    return {endpoint: endpoint, maxRequests: maxRequests}
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
    statusCallback: statusCallback,
};

console.log("endpoint: "+ getParams().endpoint)
console.log("maxRequsts: "+ getParams().maxRequests)

loadtest.loadTest(options, function(error, result)
{
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log(result)
    console.log('Tests run successfully');
});