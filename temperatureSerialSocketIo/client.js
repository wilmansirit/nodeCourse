'use strict'

const socket = require('socket.io-client')('http://10.0.0.101:3000');

let sendData = null;

socket.on('connect', () => {

    console.log('Conectado con el Servidor');

})

socket.on('temperature', (data) => {
    sendData = data.serial;
    console.log(`${data.time} - Temp: ${data.celsius}`);
})
