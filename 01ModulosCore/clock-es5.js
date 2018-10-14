'use stric'
/**
 * Crear funcion autoejecutable para luego exportarla. Hacer uso de la forma de la funcion:
 * 
 *                                      var newFunction = (function(){
 * 																	// Constructor
 * 																	var newFunction() {
 * 																			...
 * 																			...
 * 																		}
 * 																	...
 * 																	...
 * 																	...		
 * 																	return newFunction
 * 																})()
 * 
 */
var Clock = (function () {

	var eventEmitter = require('events').EventEmitter,
		inherits = require('util').inherits

	// Constructor
	var Clock = function () {

		var self = this

		setInterval(function () {
			self.emit('tictac')
		}, 1000)

	}

	inherits(Clock, eventEmitter)

	Clock.prototype.theTime = function () {

		var date = new Date(),
			hrs = date.getHours(),
			min = addZero(date.getMinutes()),
			sec = addZero(date.getSeconds()),
			ampm = hrs > 12 ? 'pm' : 'am'

		hrs = hrs > 12 ? hrs - 12 : hrs
		hrs = addZero(hrs)


		function addZero(value) {
			return value < 10 ? ('0' + value) : value.toString()
		}



		var msg = hrs + ':' + min + ':' + sec + ' ' + ampm

		console.log(msg)

	}

	// La funcion autoejecutable debe retornar un objeto, en este caso el Constructor de la "Clase"
	return Clock

})()

module.exports = Clock