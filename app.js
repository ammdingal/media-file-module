const http = require('http');
const fs = require('fs');
const static_contents = require('./static');
server = http.createServer(function (request, response){
  	static_contents(request, response);
});

server.listen(8920);
console.log("Running in localhost at port 8920");