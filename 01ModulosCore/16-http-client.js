'use strict'

const http = require('http'),
    options = {
        host: 'www.mediotiempo.com',
        port: '80',
        path: '/'
    }

let htmlCode = '';
let count = 0;

const htmlServer = (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        htmlCode += chunk;
        ++count;
    });
    res.on('end', () => console.log(`No more data in response. Chunk number: ${count}`));
}

const errorHtml = (err) => {
    console.log(`El sitio ${options.host} no respondió. Error: ${err.code}. Message: ${err.message}`)
}

// Http Client instance
http.get(options, htmlServer)
    .on('error', errorHtml)


// Http Server instance
const webServer = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(htmlCode)
}

http.createServer(webServer)
    .listen(3000, () => {
        console.log(`Server running on port 3000`);
    })