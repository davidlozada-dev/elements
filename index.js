//Import Express and Cors from the folder node_modules
const express = require("express");
const cors = require("cors");

const players = [];

class Player {
  constructor(id) {
    this.id = id;
  }

  createCharacter(characterName) {
    this.characterName = characterName;
  }
}

class Character {
  constructor(name) {
    this.name = name;
  }
}

//Create Express app
const app = express();
app.use(cors());
app.use(express.json());

//Choose a port number through which the web server will listen to
const port = 5000;

//Send data to the web browser
app.get("/join", (req, res) => {
  const id = `${Math.random()}`;
  const player = new Player(id);

  players.push(player);

  res.send(id);
});

//Recieve user's id to asign a character to its object
app.post("/createCharacter/:id", (req, res) => {
  const id = req.params.id;
  const characterName = req.body.characterName;


  players.forEach((element, elementIndex)  => {
    const idNumber = element.id;

    if(idNumber === id){
      players[elementIndex].createCharacter(characterName);
    }

  });

  console.log(players);

  res.end();
});

//Turn on the server in port 3000
app.listen(port, () => {
  console.log("Server sucessfully started!");
});
