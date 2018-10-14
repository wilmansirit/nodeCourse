'use strict'

const fs = require('fs'),
    file = './assets/nombres.txt';

fs.access(file, fs.constants.F_OK, err => {
    if (err) {
        console.log('File not Found..!');
        
    } else {

        fs.readFile(file, err => {
            if (err) {
                console.log('File can not be read...!');                
            } else {
                fs.copyFile(file, './assets/nombresCopia.txt', err => {
                    if (err){
                        console.log('File can not be copied..!');                        
                    } else {
                        console.log('Success, File Copied..!!');                        
                    }
                })
            }
        })

    }
})
