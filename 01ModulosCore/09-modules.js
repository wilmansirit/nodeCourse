'use strict'

const Clock = require('./clock-es6')

const clock = new Clock()

clock.on('event', () => clock.theTime())