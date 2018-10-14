'use strict'

/**
 * Léelo
 * Cópialo
 * Avisa que se copió
 * Maneja Errores
 */

const fs = require('fs'),
    sourceFile = './assets/nombres.txt',
    destinationFile = './assets/nombres-promises-es6.txt';

const existFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.access(file, (err) => {
            (err) ? reject(new Error('File not Found..!')): resolve(file);
        })
    })
}
const readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            (err) ? reject(new Error('Error..! Can Not Read the File.')): resolve(data);
        })
    })
}
const writeFile = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(destinationFile, data, err => {
            (err) ? reject(new Error('Error..! Can Not Write the File.')): resolve('File Written');
        })
    })
}

existFile(sourceFile)
    .then(file => readFile(file))
    .then(dataRead => writeFile(dataRead))
    .then(result => console.log(result))
    .catch(err => console.error(err))