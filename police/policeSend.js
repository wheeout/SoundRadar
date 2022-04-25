const net = require('net')
const server = new net.Server()
const port = 8085

server.listen(port, () => {
    console.log(`Executando na porta ${port}`)
})

server.on('connection', (socket) => {
    console.log('Conectado com a polícia')

    socket.on('data', (chunk) => {
        console.log(chunk.toString())

        const bufferMsg = Buffer.from('Uma viatura está a caminho do local')

        socket.write(`${bufferMsg}`);
    })

    socket.on('end', () => {
        console.log('Encerrando conexão com a polícia')
    })

    socket.on('error', (err) => {
        console.log(err)
    })
})
