``` 

npm install mobile-agent

```


mobile-agent
===========

Easy mobile browser detection helper for Node.js

Simple Example (Node HTTP):

```javascript

// Writes the user agent obj. out to the screen
var http = require('http');
var util = require('util');
var ua 	 = require('mobile-agent');

http.createServer(function (req, res) {
	var agent = ua(req.headers['user-agent']);

	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(util.inspect(agent));
}).listen(8080);

util.log("Server listening on port 8080.");

/** Example output:
{ 
  Mobile: false,
  iOS: false,
  iPhone: false,
  iPad: false,
  Android: false,
  webOS: false,
  Mac: '10.8.1',
  Windows: false,
  Other: false,
  Browser: { 
  	name: 'safari', 
  	version: '536.25' 
  } 
}
**/

```


Express example:

```javascript

var ua 	 = require('mobile-agent');

app.get('/', function(req, res) {
	var agent = ua(req.headers['user-agent'])

	if(agent.Mobile === true) {
		res.render('mobile', {
			foo: 'bar'
		});
	} else {
		res.render('desktop', {
			foo: 'bar'
		});
	}
});

```