'use strict'

const http = require('http'),
    fs = require('fs'),
    mysql = require('mysql'),
    index = './index.html';
    

const client = mysql.createConnection({
    'user': 'venezuela',
    'password': 'mZe7zj$THFvJSpeX',
    'host' : '',
    'port' : 3306
})

client.query("USE venezuela")

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
    .listen(3000, () => console.log('Server running on Port 3000'));


// Configurando el Socket
const io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {


    let sqlStr = '';

    // EMIT del Llenado del SELECT Estado al iniciar la página
    sqlStr = 'SELECT id, estado FROM estados';
    client.query(sqlStr, (err, rs, field) => {
        if (err) throw err;
        socket.emit('estados', rs)
    })

    // EMIT del llenado del SELECT Municipio
    socket.on('municipios', data => {

        if (data) sqlStr = `SELECT id, municipio FROM municipios WHERE estado_id=${data.id}`

        client.query(sqlStr, (err, rs, field) => {
            if (err) throw err;
            socket.emit('municipios', rs);
        })
    })
    

    // EMIT del Llenado del SELECT de las Parroquias
    socket.on('parroquias', data => {

        if (data) sqlStr = `SELECT id, parroquia FROM parroquias WHERE municipio_id=${data.id}`

        client.query(sqlStr, (err, rs, field) => {
            if (err) throw err;
            socket.emit('parroquias', rs)
        })
    })
    // Sockets de PRUEBA***********************
    // RECIBIENDO
    socket.on('test', data => {
        console.log(data);        
    })
    // EMITIENDO
    let cont = 0;
    setInterval(() => {

        socket.emit('clock', cont)
        ++cont;

    }, 1000);



});