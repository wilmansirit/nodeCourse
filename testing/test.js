'use strict'

const http = require('http')
const options = {
    hostname: 'www.google.com',
    port: '80',
    path: '/'
}

function htmlServer(res) {
    // console.log(`STATUS: ${res.statusCode}`);
    // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => console.log(`BODY: ${chunk}`));
    res.on('end', () => console.log('No more data in response.'));
}

http.get(options, htmlServer);