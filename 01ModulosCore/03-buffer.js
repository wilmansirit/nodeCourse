'use strict'

const buf = new Buffer.alloc(100),
	buf2 = new Buffer.alloc(26),
	buf3 = new Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
	str = '\u00bd + \u00bc = \u00be';




buf.write('abcd', 0, 4, 'ascii')

console.log(
	buf,
	buf.toString('ascii'),
	str,
	str.length + 'Caracteres',
	Buffer.byteLength(str, 'utf8') + 'bytes'
)

for (var i = 0; i < buf2.length; i++) {
	buf2[i] = i + 97
}

console.log(buf2.toString('ascii'))
console.log(buf3.toString('ascii'));
