'use strict'

const util = require('util'),
    querystream = require('querystring'),
    htmlCode = '',
    url = require('url'),
    dataStream = 'http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=Node.js&chld=H|0';



    const dataObject = querystream.parse(dataStream);
    const dataJSON = util.inspect(dataObject);
    const dataUrl = url.parse(dataStream, true);


    console.log('*****************************************************');
    console.log( '\ndataObject:\n' , dataObject);
    console.log( '\ndataJSON:\n', dataJSON);    
    console.log('\ndataUrl:\n', dataUrl );
    

    /*

    dataObject: {
        'http://chart.apis.google.com/chart?cht': 'qr',
        chs: '300x300',
        chl: 'Node.js',
        chld: 'H|0'
    }

    dataJSON: {
        'http://chart.apis.google.com/chart?cht': 'qr',
        chs: '300x300',
        chl: 'Node.js',
        chld: 'H|0'
    }

    dataUrl:
        Url {
            protocol: 'http:',
            slashes: true,
            auth: null,
            host: 'chart.apis.google.com',
            port: null,
            hostname: 'chart.apis.google.com',
            hash: null,
            search: '?cht=qr&chs=300x300&chl=Node.js&chld=H%7C0',
            query: {
                cht: 'qr',
                chs: '300x300',
                chl: 'Node.js',
                chld: 'H|0'
            },
            pathname: '/chart',
            path: '/chart?cht=qr&chs=300x300&chl=Node.js&chld=H%7C0',
            href: 'http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=Node.js&chld=H%7C0'
        }
*/