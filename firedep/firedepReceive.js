const net = require('net')
const server = new net.Server()
const port = 8080

server.listen(port, () => {
    console.log(`Executando na porta ${port}`)
})

server.on('connection', (socket) => {
    console.log('Conectado com o radar')

    firedepSend(socket)

    socket.on('data', (data) => {
        console.log(data.toString())
    })

    socket.on('end', () => {
        console.log('Encerrando conexão com o radar')
    })

    socket.on('error', (err) => {
        console.log(err)
    })
})

function firedepSend(socket) {
    const firedepSocket = new net.Socket();
    const firedepPort = 8081

    socket.on('data', (chunk) => {
       firedepSocket.connect(firedepPort, 'localhost', () => {
            console.log(`Comunicar com o corpo de bombeiros pela porta ${firedepPort}`);

            const bufferMsg = Buffer.from(chunk.toString())
           firedepSocket.write(`${bufferMsg}`);

           firedepSocket.on('data', (content) => {
                console.log(content.toString());

                socket.write(content.toString());
               firedepSocket.end();
            })

           firedepSocket.on('end', function () {
                console.log('Encerrando conexão com os bombeiros');
            })

           firedepSocket.on('error', function (err) {
                console.log(err);
            })
        });
    })
}