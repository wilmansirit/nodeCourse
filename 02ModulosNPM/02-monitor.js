'use strict'

const http = require('http'),
    fs = require('fs'),
    port = 3000;

let index = fs.readFileSync('./assets/index.html'),
    count = 0;

const webServer = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end(index);
}

http
    .createServer(webServer)
    .listen(port, () => {
        console.log(`Server running on port ${port}`);
    });