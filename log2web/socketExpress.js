'use strict'

const express = require('express'),
    app = express(),
    path = require('path'),
    port = 3000;

// *************************** Statics files ***************************
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
    console.log('Time: %d', Date.now());
    next();    
})

app.get('/app', (req, res) => {
    res.send('Hello World')
})

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Creando el servico de socket
const io = require('socket.io').listen(server);


io.sockets.on('connection', (socket) => {
    console.log( 'New Connection..!');
    socket.emit('app', 'Hola Mundo..!');
})