'use strict'

const http = require('http'),
    fs = require('fs'),
    stdin = process.stdin,
    stdout = process.stdout,
    index = './log2Web.html';


const webServer = (req, res) => {
    fs.readFile(index, (err, data) => {
        if (err) throw err;

        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-length': data.length
        })
        res.write(data);
        res.end();
    })
}


const server = http.createServer(webServer)
    .listen(3000, () => console.log('Server running on Port 3000...'));

const io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {

    socket.emit('message', {'message' : 'Bienvenido...!'})

    stdin.resume();
    stdout.write('> ');
    stdin.on('data', (res) => {
        socket.emit('message', {'message' : res.toString()})
    })

})

