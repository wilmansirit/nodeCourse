'use strict'

const EventEmitter = require('events')

class Clock extends EventEmitter {
	constructor() {
		super()
		setInterval(() => {
			this.emit('event')
		}, 1000)
	}

	theTime() {

		let date = new Date(),
			hrs = date.getHours(),
			min = this.addZero(date.getMinutes()),
			sec = this.addZero(date.getSeconds()),
			ampm = hrs > 12 ? 'pm' : 'am'

		hrs = hrs > 12 ? hrs - 12 : hrs
		hrs = this.addZero(hrs)
		
		console.log( `${hrs}:${min}:${sec}${ampm}` )
	}
	
	addZero(value) {
		return value < 10 ? ('0' + value) : value.toString()
	}	
}

module.exports = Clock
