'use strict';

const WebSocket = require('ws'),

	wss = new WebSocket.Server({
		port: 8080
	});

wss.on('connection', (socket, request) => {

	const ip = request.connection.remoteAddress;
	console.log('New User connected from: ' + ip);

	socket.on('message', (data) => {
		console.log(data);
	});
		
	socket.send('Welcome User...!');

	socket.on('close', () => console.log('I lost a Client'));
});
