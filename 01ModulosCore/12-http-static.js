'use strict'
// Lectura de Archivo estático
var http = require('http').createServer(webServer),
	fs = require('fs')

function webServer(req, res) {

	function readFile(err, data)
	{
		if(err) throw err
		res.end(data)
	}
	res.writeHead(200, {'Content-Type': 'text/html'})
	debugger;
	fs.readFile('asset/index.html', readFile)
}

http.listen(3000)

console.log('Servidor corriendo en http/localhost:3000')