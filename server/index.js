var http = require('http');
var querystring = require('querystring');

function processPost(request, response, callback) {
  var queryData = "";
  if(typeof callback !== 'function') return null;

  if(request.method == 'POST') {
      request.on('data', function(data) {
          queryData += data;
          if(queryData.length > 1e6) {
              queryData = "";
              response.writeHead(413, {'Content-Type': 'text/plain'}).end();
              request.connection.destroy();
          }
      });

      request.on('end', function() {
          request.post = querystring.parse(queryData);
          callback();
      });

  } else {
      response.writeHead(405, {'Content-Type': 'text/plain'});
      response.end();
  }
}

http.createServer(function (request, response) {
  if(request.method == 'POST') {
    try{
      processPost(request, response, function() {
        console.log(request.post);
        response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
        response.end();
    })
    }catch (error){
      console.error(console.error(error))
    }
} else {
    response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
    response.write("Got it!")
    response.end();
}
}).listen(process.env.port || 8080, () => {
    console.log(`Server is running on 8080`)})