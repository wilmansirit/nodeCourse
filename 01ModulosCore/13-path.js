'use strict'

const http = require('http').createServer(webServer),
	path = require('path'),
	urls = [{
		route: '',
		output: '<h4>Home</h4>'
	},
	{
		route: 'acerca',
		output: '<h4>acerca</h4>'
	},
	{
		route: 'contacto',
		output: '<h4>Contacto</h4>'
	}
	]


function webServer(req, res) {

	const message = '<h1>Hola Node.js</h1>',
		pathUrl = path.basename(req.url)

	urls.forEach((url) => {

		if (url.route == pathUrl) {
			res.writeHead(200, {
				'Content-Type': 'text/html'
			})
			res.end(message + url.route)
		}

	})
	
	if ( !res.finished ) {
		res.writeHead(404, {'Content-Type': 'text/html'})
		res.end('<h1>Error 404: Page Not Found</h1>')
	}
}

http.listen(3000)
console.log('Server running on http://localhost:3000')