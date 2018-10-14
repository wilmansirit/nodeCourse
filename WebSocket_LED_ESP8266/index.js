'use strict';

const http = require('http'),
	fs = require('fs'),
	index = './assets/index.html';


const webServer = (req, res) => {

	res.writeHead(200, {
		'Content-type': 'text/html'
	});

	fs.readFile(index, (err, data) => {
		if (err) {
			console.error(err);
			res.end('500 Internal Server Error');
		} else {
			res.end(data);
		}

	});
};


http.createServer(webServer)
	.listen(3000, () => {
		console.log('Server running on port 3000');
	});