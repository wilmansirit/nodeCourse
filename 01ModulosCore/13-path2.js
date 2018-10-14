'use strict'

const http = require('http').createServer(webServer)
const path = require('path')

function webServer(req, res) {
	const urlReq = path.basename(req.url)

	res.writeHead(200, {'Content-Type': 'text/html'})
	res.write('<h1>Node.js Server</h1>')

	switch (urlReq) {

	case '':
		res.write('<h4>Home</h4>')
		break
	case 'content':
		res.write('<h4>Contenido</h4>')
		break
	case 'acerca':
		res.write('<h4>Acerca</h4>')
		break

	default:
		res.write('<h1>Error 404: Not Found</h1>')
		break
	}

}



http.listen(3000)
console.log('Server running on http://localhost:3000')