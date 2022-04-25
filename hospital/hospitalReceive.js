const net = require('net')
const server = new net.Server()
const port = 8082

server.listen(port, () => {
    console.log(`Executando na porta ${port}`)
})

server.on('connection', (socket) => {
    console.log('Conectado com o radar')

    hospitalSend(socket)

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

function hospitalSend(socket) {
    const hospitalSocket = new net.Socket();
    const hospitalPort = 8083

    socket.on('data', (chunk) => {
        hospitalSocket.connect(hospitalPort, 'localhost', () => {
            console.log(`Comunicar com o hospital pela porta ${hospitalPort}`);

            const bufferMsg = Buffer.from(chunk.toString())
            hospitalSocket.write(`${bufferMsg}`);

            hospitalSocket.on('data', (content) => {
                console.log(content.toString());

                socket.write(content.toString());
                hospitalSocket.end();
            })

            hospitalSocket.on('end', function () {
                console.log('Encerrando a conexão com o hospital');
            })

            hospitalSocket.on('error', function (err) {
                console.log(err);
            })
        });
    })
}