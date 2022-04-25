const chalk = require('chalk');
const dgram = require("dgram");
const client = dgram.createSocket("udp4");

client.bind({
  address: "localhost",
  port: 8000,
  exclusive: false,
});

client.on("listening", () => {
  sendMessage();
});

client.on("data", (data) => {
  console.log(data.toString())
});

client.on("end", () => {
  console.log("Desconectado");
});

const prompt = require("prompt-sync")();

const sendMessage = async () => {
  const bufferMsg = Buffer.from("Nenhum som anormal detectado.");

  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`${bufferMsg}`);

    client.send(bufferMsg, 0, bufferMsg.length, 8800, "localhost");

    let abnormalSound = Math.floor(Math.random() * 4);

    if (abnormalSound == 2) {
      console.log(chalk.bgRed("Som anormal detectado. É necessário algum atendimento no local?\r\n0: Não\r\n1: Sim, precisamos do corpo de bombeiros\r\n2: Sim, precisamos de uma ambulância\r\n3: Sim, precisamos de alguém da polícia"))
      let option = prompt();
      let call = Number(option);

      if (call == 1) {
        const net = require("net");
        const client = new net.Socket();

        client.connect(8080, "localhost", () => {
          console.log("Conectado ao corpo de bombeiros");

          const message = Buffer.from("Precisamos dos bombeiros");

          client.write(message);
        });

        client.on("data", (data) => {
          console.log(chalk.bgGreen(data.toString()));
          client.end();
        });
      }

      if (call == 2) {
        const net = require("net");
        const client = new net.Socket();

        client.connect(8082, "localhost", () => {
          console.log("Conectado ao hospital");

          const message = Buffer.from("Precisamos de uma ambulância.");

          client.write(message);
        });

        client.on("data", (data) => {
          console.log(chalk.bgGreen(data.toString()));
          client.end();
        });
      }

      if (call == 3) {
        const net = require("net");
        const client = new net.Socket();

        client.connect(8084, "localhost", () => {
          console.log("Conectado a polícia");

          const message = Buffer.from("Precisamos de alguém da polícia");

          client.write(message);
        });

        client.on("data", (data) => {
          console.log(chalk.bgGreen(data.toString()));
          client.end();
        });
      }
    }
  }
};
