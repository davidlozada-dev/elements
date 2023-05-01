window.addEventListener("load", setEventListeners);

function setEventListeners() {
  let selectCharacterBtn = document.getElementById("choose-character-btn");
  selectCharacterBtn.addEventListener("click", choosePlayerCharacter);

  let playAgainBtn = document.getElementById("play-again-btn");
  playAgainBtn.addEventListener("click", (e) => {
    window.location.reload();
  });

  document.getElementById("battlefield").style.display = "none";
  document.getElementById("final-result").style.display = "none";
}

function choosePlayerCharacter() {
  let characters = document.getElementsByName("character");

  let characterCell = document.getElementById("player-character");
  let elementCell = document.getElementById("player-element");
  let livesCell = document.getElementById("player-lives");

  let parentElement = document.getElementById("player-character-img");
  let playerCharacterImage;

  for (let i = 0; i < characters.length; i++) {
    if (characters[i].checked == true) {
      playerChosenCharacter = characters[i].value;
    }
  }

  choosePcCharacter();

  characterCell.innerText = playerChosenCharacter;
  elementCell.innerText = characterElement(playerChosenCharacter);
  livesCell.innerText = playerLives;

  playerCharacterImage = selectCharacterImage(playerChosenCharacter, false);
  parentElement.insertBefore(playerCharacterImage, parentElement.firstChild);
}

function choosePcCharacter() {
  let randomNumber = randomNumberGivenARange(1, 3);
  let subtitleElement = document.getElementById("subtitle");

  let chooseCharacterElement = document.getElementById("choose-character");
  let battlefieldElement = document.getElementById("battlefield");

  let characterCell = document.getElementById("pc-character");
  let elementCell = document.getElementById("pc-element");
  let livesCell = document.getElementById("pc-lives");

  let parentElement = document.getElementById("pc-character-img");
  let pcCharacterImage;

  if (randomNumber == 1) {
    pcChosenCharacter = "Capricorn";
  } else if (randomNumber == 2) {
    pcChosenCharacter = "Aquarius";
  } else {
    pcChosenCharacter = "Leo";
  }

  characterCell.innerText = pcChosenCharacter;
  elementCell.innerText = characterElement(pcChosenCharacter);
  livesCell.innerText = pcLives;

  pcCharacterImage = selectCharacterImage(pcChosenCharacter, false);
  parentElement.insertBefore(pcCharacterImage, parentElement.firstChild);

  chooseCharacterElement.style.display = "none";

  subtitleElement.innerText = "Choose an attack!";
  battlefield.style.display = "block";

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
  let livesCell = document.getElementById("player-lives");

  if (pcChosenAttack == playerChosenAttack) {
    battleResult = "tie";
  } else if (pcChosenAttack == 1 && playerChosenAttack == 2) {
    battleResult = "PC's victory!";
    pcVictories++;
    playerLives--;
    document.getElementById("player-lives").innerText = playerLives;
  } else if (pcChosenAttack == 2 && playerChosenAttack == 3) {
    battleResult = "PC's victory!";
    pcVictories++;
    playerLives--;
    document.getElementById("player-lives").innerText = playerLives;
  } else if (pcChosenAttack == 3 && playerChosenAttack == 1) {
    battleResult = "PC's victory!";
    pcVictories++;
    playerLives--;
    document.getElementById("player-lives").innerText = playerLives;
  } else {
    battleResult = "Player's victory";
    playerVictories++;
    pcLives--;
    document.getElementById("pc-lives").innerText = pcLives;
  }

  battleResultElement.innerText = battleResult;

  checkingScore();
}

function characterElement(character) {
  let element;

  if (character == "Capricorn") {
    element = "Earth 🌱";
  } else if (character == "Aquarius") {
    element = "Water 💧";
  } else {
    element = "Fire 🔥";
  }

  return element;
}

function checkingScore() {
  if (playerLives == 0 || pcLives == 0) {
    let subtitleElement = document.getElementById("subtitle");
    let finalResultElement = document.getElementById("final-result");
    let result =
      playerLives == 0 ? "PC has won the game!" : "Player has won the game!";

    document.getElementById("battlefield").style.display = "none";

    subtitleElement.innerText = "Final Result";
    finalResultElement.style.display = "block";

    let finalResultMessageElement = document.getElementById("final-result-msg");

    finalResultMessageElement.innerText = result;
  }
}

function selectCharacterImage(characterName, isPlayer) {
  let selectedImage = document.createElement("img");
  selectedImage.id = isPlayer ? "player-img" : "pc-img";
  selectedImage.className = "character-img";

  switch (characterName) {
    case "Capricorn":
      selectedImage.src = "./assets/goat.png";
      selectedImage.alt = "Capricorn";

      break;

    case "Aquarius":
      selectedImage.src = "./assets/koi.png";
      selectedImage.alt = "Aquarius";

      break;

    case "Leo":
      selectedImage.src = "./assets/lion.png";
      selectedImage.alt = "Leo";

      break;

    default:
      selectedImage.src = "./assets/warning.png";
      selectedImage.alt = "Warning";
  }

  return selectedImage;
}

let playerChosenCharacter;
let pcChosenCharacter;
let playerVictories = 0;
let playerLives = 3;
let pcVictories = 0;
let pcLives = 3;
