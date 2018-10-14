'use stric'

var eventEmitter = require('events').EventEmitter,
	inherits = require('util').inherits

var Clock = function() {

	var self = this

	setInterval(function () {
		self.emit('tictac')
	}, 1000)

}

inherits(Clock, eventEmitter)

Clock.prototype.theTime = function() {

	var date = new Date(),
		hrs = date.getHours(),
		min = date.getMinutes(),
		sec = date.getSeconds()

	hrs = hrs < 10 ? ('0' + hrs) : hrs.toString()
	min = min < 10 ? ('0' + min) : min.toString()
	sec = sec < 10 ? ('0' + sec) : sec.toString()

	var msg = hrs + ':' + min + ':' + sec

	console.log( msg)
	
}

var cucu = new Clock()

cucu.on('tictac', function() {
	cucu.theTime()
})


