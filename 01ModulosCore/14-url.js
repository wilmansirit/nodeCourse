'use strict'

const http = require('http').createServer(webServer),
	path = require('path'),
	url = require('url'),
	fs = require('fs'),
	urls = [{
			id: 1,
			route: '',
			output: './assets/index.html'
		},
		{
			id: 2,
			route: 'acerca',
			output: './assets/index1.html'
		},
		{
			id: 3,
			route: 'contacto',
			output: './assets/index2.html'
		}
	];

function webServer(req, res) {

	const pathUrl = path.basename(req.url),
		id = url.parse(req.url, true).query.id

	urls.forEach((url) => {
		if (url.route == pathUrl || url.id == id) 
		{
			res.writeHead(200, {'Content-Type': 'text/html'});
			fs.readFile(url.output, (err, data) => {
				if(err) throw err	
				res.end( data )
			});
		}
	});

	console.log(!res.finished);	

	if (!res.finished) {
		res.writeHead(404, {'Content-Type': 'text/html'});
		fs.readFile('./assets/404.html', (err, data) => {
			if (err) throw err
			res.end(data)
		});
	}
}

http.listen(3000);
console.log('Server running on http://localhost:3000');