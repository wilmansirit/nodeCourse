'use strict'

$(document).ready( function(){
    
    const socket = io();
    
    socket.on('app', data => {
        
            document.getElementById('app').innerHTML = data
        
        }); 
    })