const chooseCharacterElement = document.getElementById("choose-character");
const battlefieldElement = document.getElementById("battlefield");
const finalResultElement = document.getElementById("final-result");
const subtitleElement = document.getElementById("subtitle");
const pcStatusInfoElement = document.getElementById("pc-status-info");
const playerStatusInfoElement = document.getElementById("player-status-info");

let characterObject;
let playerChosenCharacter;
let pcChosenCharacter;
let playerVictories = 0;
let playerLives = 3;
let pcVictories = 0;
let pcLives = 3;
let capitalizedName;
let playerId;

let arreglo;

window.addEventListener("load", setEventListeners);

function setEventListeners() {
  let selectCharacterBtn = document.getElementById("choose-character-btn");
  selectCharacterBtn.addEventListener("click", choosePlayerCharacter);

  let playAgainBtn = document.getElementById("play-again-btn");
  playAgainBtn.addEventListener("click", (e) => {
    window.location.reload();
  });

  chooseCharacterElement.style.display = "flex";
  battlefieldElement.style.display = "none";
  finalResultElement.style.display = "none";

  const chooseCharacterOptionsElement = document.getElementById(
    "choose-character-options"
  );
  let characterElements;
  allCharacters.forEach((character) => {
    capitalizedName =
      character.name.charAt(0).toUpperCase() + character.name.slice(1);
    characterElements = `<input type="radio" name="character" id="${character.name}" value="${capitalizedName}" />
    <label for="${character.name}">
       <img src="${character.image}" alt="${capitalizedName}" class="first-card-character-img" />
       <p>${capitalizedName}</p>
    </label>`;

    chooseCharacterOptionsElement.innerHTML += characterElements;
  });

  joinVideogame();
}

function joinVideogame() {
  fetch("http://localhost:5000/join")
    .then((response) => response.json())
    .then((id) => {
      playerId = id;
      console.log("This is the user's id: " + id);
    });
}

function sendChosenCharacterToBackend(characterName) {
  alert(characterName);
  fetch(`http://localhost:5000/createCharacter/${playerId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      characterName: characterName
    })
  });
}

function choosePlayerCharacter() {
  let characters = document.getElementsByName("character");

  let characterCell = document.getElementById("player-character");
  let parentElement = document.getElementById("player-character-img");

  let imgChildElement = document.createElement("img");

  let playerCharacterImage;

  for (let i = 0; i < characters.length; i++) {
    if (characters[i].checked == true) {
      playerChosenCharacter = characters[i].value;
    }
  }

  characterObject = allCharacters.filter(
    (character) => character.name == playerChosenCharacter.toLowerCase()
  );

  choosePcCharacter();

  characterCell.innerText = playerChosenCharacter;
  playerStatusInfoElement.appendChild(displayHearts(playerLives));

  playerCharacterImage = characterObject[0].image;

  imgChildElement.id = "player-img";
  imgChildElement.src = playerCharacterImage;
  imgChildElement.alt = playerChosenCharacter;
  imgChildElement.className = "character-img";

  parentElement.insertBefore(imgChildElement, parentElement.firstChild);

  sendChosenCharacterToBackend(playerChosenCharacter);

  // alert(playerChosenCharacter);
}

function choosePcCharacter() {
  let randomNumber = randomNumberGivenARange(0, allCharacters.length - 1);

  let characterCell = document.getElementById("pc-character");

  let parentElement = document.getElementById("pc-character-img");

  let imgChildElement = document.createElement("img");

  let pcCharacterImage;

  pcChosenCharacter = allCharacters[randomNumber].name;
  pcCharacterImage = allCharacters[randomNumber].image;

  capitalizedName =
    pcChosenCharacter.charAt(0).toUpperCase() + pcChosenCharacter.slice(1);

  imgChildElement.id = "pc-img";
  imgChildElement.src = pcCharacterImage;
  imgChildElement.alt = capitalizedName;
  imgChildElement.className = "character-img";

  characterCell.innerText = capitalizedName;
  pcStatusInfoElement.appendChild(displayHearts(pcLives));

  parentElement.insertBefore(imgChildElement, parentElement.firstChild);

  chooseCharacterElement.style.display = "none";

  subtitleElement.innerText = "Choose an attack!";
  battlefieldElement.style.display = "flex";

  let selectAttackBtn = document.querySelectorAll(".attack-btn");
  selectAttackBtn.forEach((element) => {
    element.addEventListener("click", battle);
  });
}

function randomNumberGivenARange(min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

  return randomNumber;
}

function battle() {
  let pcChosenAttack = randomNumberGivenARange(1, 3);
  let playerChosenAttack = this.value;
  let battleResult;
  let battleResultElement = document.getElementById("battle-result");

  if (pcChosenAttack == playerChosenAttack) {
    battleResult = "Tie";
  } else if (pcChosenAttack == 1 && playerChosenAttack == 2) {
    battleResult = "PC's victory!";
    pcVictories++;
    playerLives--;

    playerStatusInfoElement.replaceChildren();
    playerStatusInfoElement.appendChild(displayHearts(playerLives));
  } else if (pcChosenAttack == 2 && playerChosenAttack == 3) {
    battleResult = "PC's victory!";
    pcVictories++;
    playerLives--;

    playerStatusInfoElement.replaceChildren();
    playerStatusInfoElement.appendChild(displayHearts(playerLives));
  } else if (pcChosenAttack == 3 && playerChosenAttack == 1) {
    battleResult = "PC's victory!";
    pcVictories++;
    playerLives--;

    playerStatusInfoElement.replaceChildren();
    playerStatusInfoElement.appendChild(displayHearts(playerLives));
  } else {
    battleResult = "Player's victory";
    playerVictories++;
    pcLives--;

    pcStatusInfoElement.replaceChildren();
    pcStatusInfoElement.appendChild(displayHearts(pcLives));
  }

  battleResultElement.innerText = battleResult;

  checkingScore();
}

function checkingScore() {
  if (playerLives == 0 || pcLives == 0) {
    let result =
      playerLives == 0 ? "PC has won the game!" : "Player has won the game!";

    battlefieldElement.style.display = "none";

    subtitleElement.innerText = "Final Result";
    finalResultElement.style.display = "flex";

    let finalResultMessageElement = document.getElementById("final-result-msg");

    finalResultMessageElement.innerText = result;
  }
}

function displayHearts(number) {
  let imageElement;
  let imageDivElement = document.createElement("div");
  imageDivElement.className = "character-lives-sub-div";

  for (let i = 0; i < number; i++) {
    imageElement = document.createElement("img");
    imageElement.className = "heart-img";
    imageElement.src = "./assets/heart.png";
    imageElement.alt = "heartNumber" + (i + 1);

    imageDivElement.appendChild(imageElement);
  }

  return imageDivElement;
}

class CreateCharacter {
  constructor(name, image) {
    this.name = name;
    this.image = image;
  }
}

let capricornCharacter = new CreateCharacter("capricorn", "./assets/goat.png");
let aquariusCharacter = new CreateCharacter("aquarius", "./assets/koi.png");
let leoCharacter = new CreateCharacter("leo", "./assets/lion.png");

let allCharacters = [];

allCharacters.push(capricornCharacter, aquariusCharacter, leoCharacter);
