'use strict'

const fse = require('fs-extra'),
    formidable = require('formidable'),
    util = require('util'),
    http = require('http'),
    port = 3000,
    querystream = require('querystring');


const uploadServer = (req, res) => {

    if (req.method.toLowerCase() == 'get') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        fse.readFile('./assets/index.html', (err, data) => {
            res.end(data)
        })
    }

    if (req.method.toLowerCase() == 'post' && req.url == '/upload') {

        let form = new formidable.IncomingForm();
        let uploadFileName = '';
        let finalFileName = './assets/';

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        form.parse(req, function (err, fields, files) {
            res.writeHead(200, {
                // 'Content-Type': 'text/html'
                'Content-Type': 'application/json'
            });
            res.write('received upload:\n\n');
            res.end(
                util.inspect({
                    fields: fields,
                    files: files
                })
            );
        });

        form
            .on('progress', (bytesReceived, bytesExpected) => console.log(parseInt(bytesReceived / bytesExpected * 100)))
            .on('file', (name, file) => {
                uploadFileName = `${file.path}`;
                finalFileName += `${file.name}`;
            })
            .on('error', err => console.error(err))
            .on('end', _ => {

                fse.copy(uploadFileName, finalFileName)
                    .then(_ => console.log('Success..!!'))
                    .catch(err => console.error(err));
                    
            })

        return;

    }
}

http
    .createServer(uploadServer)
    .listen(port, () => {
        console.log(`Server running on port ${port}`);
    });





















//     .on('fileBegin', (name, file) => {
//     console.log(`File ${file.name} is begining to upload....`);            
// })
// .on('progress', (bytesReceived, bytesExpected) => {
//     console.log(parseInt( bytesReceived / bytesExpected * 100));            
// })
// .on('file', (name, file) => {

//     uploadFileName = `${file.path}/${file.name}`
//     console.log(
//         util.inspect( uploadFileName )
//     );            
// })