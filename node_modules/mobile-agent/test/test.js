var http = require('http');
var util = require('util');
var ua 	 = require('../lib/mobile');

http.createServer(function (req, res) {
	var agent = ua(req.headers['user-agent']);
	console.log(agent);

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(util.inspect(agent));
}).listen(8080);

util.log("Server listening on port 8080.");