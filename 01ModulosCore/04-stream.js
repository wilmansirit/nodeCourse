'use strict'

const fs = require('fs');

const readStream = fs.createReadStream('./assets/nombres.txt');
const writeStream = fs.createWriteStream('./assets/nombres_copia.txt');

readStream.pipe(writeStream)