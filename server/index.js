var http = require('http');

http.createServer(function (req, res) {
    res.write('Hello World!');
    res.end();
  }).listen(process.env.port || 8080, () => {
    console.log(`Server is running on 8080`)})