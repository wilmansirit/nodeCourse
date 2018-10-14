'use sctrict'

const http = require('http')


const webServer = (req, res)=>
{
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end("<h1>Hola Node.js..!</h1>")
}

http
    .createServer( webServer )
    .listen(3000,"localhost")

console.log("Server running.....")