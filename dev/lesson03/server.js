const http = require('http')
const host = '127.0.0.1'
const port = 3000
const timeout = 100
const server = http.createServer((req, res) => {
    res.statusCode = 200
    setTimeout(() => res.end('Pong'), timeout)
})

server.listen(port, host, () => {
    console.log(`Server started on ${host}:${port}`)
})