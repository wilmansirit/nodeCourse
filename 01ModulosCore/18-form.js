'use strict'

const http = require('http').createServer(webServer),
    form = require('fs').readFileSync('./assets/form.html'),
    querystream = require('querystring'),
    util = require('util');

    let dataString = '';

function webServer(req, res) {

    if (req.method == 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(form);
    }

    if (req.method == 'POST') {
        req
            .on('data', function (data) {
                dataString += data
            })
            .on('end', function () {

                var dataObject = querystream.parse(dataString);
                var dataJSON = util.inspect(dataObject)
                let templateString = `Los datos enviados por POST como string son: ${dataJSON}`
                console.log(templateString);
                res.end(templateString);
                res.end()

                console.log( dataJSON );
                dataString = '';

            })

        // res.end();


    }
}



http.listen(3000, 'localhost', () => {
    console.log('Server running on localhost:3000....');
});