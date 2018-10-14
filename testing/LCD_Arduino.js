var five = require('johnny-five'),
	board, lcd

board = new five.Board()

board.on('ready', function () {

	lcd = new five.LCD({
		// LCD pin name  RS  EN  DB4 DB5 DB6 DB7
		// Arduino pin # 8    9   4    5   6   7
		pins: [8, 9, 4, 5, 6, 7],
		backlight: 10,
		rows: 2,
		cols: 16
		// Options:
		// bitMode: 4 or 8, defaults to 4
		// lines: number of lines, defaults to 2
		// dots: matrix dimensions, defaults to '5x8'
	})

	// Tell the LCD you will use these characters:
	lcd.useChar('check')
	lcd.useChar('heart')
	lcd.useChar('duck')

	// Line 1: Hi rmurphey & hgstrp!
	lcd.clear().print('rmurphey, hgstrp')
	lcd.cursor(1, 0)

	// Line 2: I <3 johnny-five
	// lcd.print('I').write(7).print(' johnny-five');
	// can now be written as:
	lcd.print('I :heart: johnny-five')

	this.wait(3000, function () {
		lcd.clear().cursor(0, 0).print('PRINT CHAR..!')
	})

	this.repl.inject({
		lcd: lcd
	})
})
