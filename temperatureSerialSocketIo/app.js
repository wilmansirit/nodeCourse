/**
 * USO DEL PUERTO SERIAL CON NODE JS
 * PARA MAYOR INFORMACION IR A:
 * https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/
 * 
 */

'use strict'

const express = require('express'),
    app = express(),
    http = require('http'),
    path = require('path'),
    moment = require('moment'),
    PORT = 3000;
    
    const Log = require('log'),
    log = new Log('info'),
    SerialPort = require('serialport'),
    ReadLine = SerialPort.parsers.Readline,
    parser = new ReadLine(),
    port = new SerialPort('/dev/ttyACM0', {
        baudRate: 9600,
        autoOpen: true
    },
    err => {
        if (err) log.error(err)
    }
    );
    
    let temperature = 25;

// Statics files
app.use(express.static(path.join(__dirname, '/public')));


const server = http.Server(app)
    .listen(3000, () => console.log(`Server running on port ${PORT}`));


const io = require('socket.io').listen(server);


port.pipe(parser)
port.on('open', () => log.info('Opening Serial Port...!'));
port.on('error', err => console.log('Error abriendo el puerto Serial...!'));
port.on('close', () => log.info('Port closed'));


io.on('connection', socket => {
    
    log.info(`New User Connected from IP ${socket.handshake.address}`);
    
    parser.on('data', data => {
        
        // console.log(data);        
        socket.emit('temperature', {
            celsius: data,
            time: moment().utc(-4).format('hh:mm:ssA')
        })    
    });

    socket.on('slider', (data) => {
        log.info(`slider: ${data}`);       
        port.write(data);
    })
    
    socket.on('disconnect', reason => log.info(reason));
})

