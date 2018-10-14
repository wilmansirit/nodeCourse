'use strict'

/**
 * Léelo
 * Cópialo
 * Avisa que se copió
 * Maneja Errores
 */

const fs = require('fs'),
    Q = require('q'),
    file = './assets/nombres.txt';

const existFile = (file) => {
    let defer = Q.defer();

    fs.access(file, fs.constants.F_OK, err => {
        (err) ? defer.reject(new Error('File not Found..!')): defer.resolve('File Exist..!!')
    })

    return defer.promise;
}
const readFile = (file) => {
    let defer = Q.defer();

    fs.readFile(file, 'utf-8', (err, sourceText) => {
        (err) ? defer.reject(new Error('Cannot Read File..!')): defer.resolve('File Read..!');
    });

    return defer.promise;
}
const writeFile = (sourceText, destinationFile) => {
    let defer = Q.defer();

    fs.copyFile(sourceText, destinationFile, err => {
        (err) ? defer.reject(new Error('Error Copying File..!')): defer.resolve('File Copied..!');
    })

    return defer.promise;
}


existFile(file)
    // Si el Archivo existe ************************************
    .then(dataExist => {
        console.log('1er Then: \n', dataExist);
        return readFile(file)
    })
    // Léelo ***************************************************
    .then(dataRead => console.log('2er Then: \n', dataRead))
    // Cópialo *************************************************
    .then(_ => {
        let destinationFile = './assets/nombres_q.txt';
        return writeFile(file, destinationFile)
    })
    // Avisa que se copió **************************************
    .then(fileCopied => console.log('3er Then: \n', fileCopied))
    // Maneja Errores ******************************************
    .fail((err) => {
        console.error(err)
    });





// const readFile = (file) => {}