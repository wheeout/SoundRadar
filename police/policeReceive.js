const net = require('net')
const server = new net.Server()
const port = 8084

server.listen(port, () => {
    console.log(`Executando na porta ${port}`)
})

server.on('connection', (socket) => {
    console.log('Conectado com o radar')

    policeSend(socket)

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

function policeSend(socket) {
    const policeSocket = new net.Socket();
    const policePort = 8085;

    socket.on('data', (chunk) => {
        policeSocket.connect(policePort, 'localhost', () => {
            console.log(`Comunicar com a polícia pela porta ${policePort}`);

            const bufferMsg = Buffer.from(chunk.toString())
            policeSocket.write(`${bufferMsg}`);

            policeSocket.on('data', (content) => {
                console.log(content.toString());

                socket.write(content.toString());
                policeSocket.end();
            })

            policeSocket.on('end', function () {
                console.log('Encerrando a conexão com a polícia');
            })

            policeSocket.on('error', function (err) {
                console.log(err);
            })
        });
    })
}