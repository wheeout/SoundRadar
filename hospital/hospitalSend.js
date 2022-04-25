const net = require('net')
const server = new net.Server()
const port = 8083

server.listen(port, () => {
    console.log(`Executando na porta ${port}`)
})

server.on('connection', (socket) => {
    console.log('Conectado com o hospital')

    socket.on('data', (chunk) => {
        console.log(chunk.toString())

        const bufferMsg = Buffer.from('Uma ambulância está a caminho do local')

        socket.write(`${bufferMsg}`);
    })

    socket.on('end', () => {
        console.log('Encerrando a conexão com o hospital')
    })

    socket.on('error', (err) => {
        console.log(err)
    })
})
