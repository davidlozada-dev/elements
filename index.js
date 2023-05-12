// Importamos Express desde la carpeta node_modules
const express = require("express");
const cors = require("cors");

const players = [];

class Player {
  constructor(id) {
    this.id = id;
  }
}

// Creamos la aplicación de Express
const app = express();
app.use(cors());

// Escojemos un puerto por el que el servidor web escuchará
const port = 3000;

// Página para visualizar el mensaje "¡Hola Express!"
app.get("/join", (req, res) => {
  const id = `${Math.random()}`;
  const player = new Player(id);

  players.push(player);
  
  res.send(id);
});

// Activamos el servidor en el puerto 3000
app.listen(port, () => {
  console.log("¡Servidor listo!");
});
