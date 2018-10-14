'use strict'

const io = require('socket.io')(8080),
moment = require('moment'),
    Log = require('log'),
    log = new Log('info');

log.info('Server is Up..!')

io.on('connection', (socket) => {

    var serverIP = socket.handshake.address;

    log.info(`User Connected from ${serverIP}`);
    
    setInterval(() => {

        let data = parseInt(Math.random() * 100)

        socket.emit('TX', {
            serial: data,
            time: moment().format('hh:mm:ssA')
        });
    }, 1000);

    socket.on('RX', (from, data) => {
        console.log(`Received data ${data} from ${from}`);
    })

})