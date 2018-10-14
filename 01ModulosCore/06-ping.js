'use strict'

const EventEmitter = require('events')
const ping = require('ping')
const five = require('johnny-five')


class Monitor extends EventEmitter {

	constructor(hosts) {
		super()
		this.hosts = hosts
		this.beat()
	}

	beat() {
		setInterval(() => {
			this.emit('ping')
		}, 5000)
	}

	testPing() {
		this.hosts.forEach(host => {
			ping.promise.probe(host)
				.then(response => {								
					this.avg = response.avg
				})
		})
	}
}

const monitor = new Monitor(['google.com'])
const board = new five.Board()

board.on('ready', () => {
	
	const led = new five.Led(13)
	
	monitor.on('ping', () => {
		
		monitor.testPing()
		let period = parseInt(monitor.avg)
		console.log(period)			

		if ( Number.isNaN(period) ){
			led.stop()
			led.off()
		} else {
			led.blink( period )
		}
	})
})

