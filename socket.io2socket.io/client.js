'use strict'

const socket = require('socket.io-client')('http://localhost:8080');

let sendData = null;

socket.on('connect', () => {

    console.log('Conectado con el Servidor');
    
})

socket.on('TX', (data) => {
    sendData = data.serial;
    console.log(`${data.time} - Data: ${data.serial}`);    
    socket.emit('RX', 'yo', sendData * 100);
})
