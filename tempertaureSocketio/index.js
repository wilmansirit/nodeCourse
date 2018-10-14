'use strict'

const http = require('http').createServer(webServer),
    io = require('socket.io').listen(http),
    fs = require('fs'),
    moment = require('moment'),
    five = require('johnny-five'),
    index = './public/index.html';

let celsius = 165,
    fahrenheit = 100;

function webServer(req, res) {
    fs.readFile(index, (err, data) => {

        if (err) {
            res.writeHead(500, {
                'Content-Type': 'text/html'
            });
            res.end('Error 500. Internal Server Error');
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data, 'utf-8');
            res.end();
        }
    })
}

http.listen(3000, () => {
    console.log('Server running on port 3000');
});

io.sockets.on('connection', (socket) => {

    console.log(`New User connected with IP: ${socket.handshake.address}`);

    five.Board().on("ready", function () {

        const temperature = new five.Thermometer({
            controller: "LM35",
            pin: "A0"
        });

        temperature.on('change', function () {
            // console.log(this.celsius + "°C", this.fahrenheit + "°F");
            celsius = this.celsius;
            fahrenheit = this.fahrenheit;

        });

    })

    // console.log('***************************************', celsius_);

    setInterval(() => {

        socket.emit('temperature', {
            'celsius': celsius,
            'fahrenheit': fahrenheit,
            'time': moment().format("hh:mm:ss a")
        });

    }, 1000);

})

io.sockets.on('end', () => {
    console.log('User disconnect..!!');    
})

