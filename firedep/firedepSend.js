const net = require('net')
const server = new net.Server()
const port = 8081

server.listen(port, () => {
    console.log(`Executando na porta ${port}`)
})

server.on('connection', (socket) => {
    console.log('Conectado com o corpo de bombeiros')

    socket.on('data', (chunk) => {
        console.log(chunk.toString())

        const bufferMsg = Buffer.from('O corpo de bombeiros está a caminho do local')

        socket.write(`${bufferMsg}`);
    })

    socket.on('end', () => {
        console.log('Encerrando a conexão com o corpo de bombeiros')
    })

    socket.on('error', (err) => {
        console.log(err)
    })
})
