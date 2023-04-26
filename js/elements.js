window.addEventListener("load", setEventListeners);

function setEventListeners() {
  let selectCharacterBtn = document.getElementById("choose-character-btn");
  selectCharacterBtn.addEventListener("click", choosePlayerCharacter);

  let playAgainBtn = document.getElementById("play-again-btn");
  playAgainBtn.addEventListener("click", e => {
    window.location.reload();
  });

  document.getElementById("choose-attack-element").style.display = "none";
  document.getElementById("battlefield").style.display = "none";
  document.getElementById("final-result").style.display = "none";
}

function disableElement(elementId) {
  document.getElementById(elementId).disabled = true;
}

function choosePlayerCharacter() {
  let characters = document.getElementsByName("character");
  let messageElement = document.getElementById("choose-character-msg");
  let paragraphElement = document.createElement("p");
  let characterCell = document.getElementById("player-character");
  let elementCell = document.getElementById("player-element");
  let livesCell = document.getElementById("player-lives");

  for (let i = 0; i < characters.length; i++) {
    if (characters[i].checked == true) {
      playerChosenCharacter = characters[i].value;
    }

    disableElement(characters[i].id);
  }

  paragraphElement.innerHTML =
    "You have chosen " + playerChosenCharacter + " as your character";
  messageElement.appendChild(paragraphElement);

  disableElement("choose-character-btn");

  choosePcCharacter();

  characterCell.innerText = playerChosenCharacter;
  elementCell.innerText = characterElement(playerChosenCharacter);
  livesCell.innerText = playerLives;
}

function choosePcCharacter() {
  let randomNumber = randomNumberGivenARange(1, 3);
  let messageElement = document.getElementById("choose-character-msg");
  let paragraphElement = document.createElement("p");
  let divOptions = document.getElementById("choose-character-options");
  let divOptionsSiblings = document.querySelectorAll("#choose-character h2");
  let characterCell = document.getElementById("pc-character");
  let elementCell = document.getElementById("pc-element");
  let livesCell = document.getElementById("pc-lives");

  if (randomNumber == 1) {
    pcChosenCharacter = "Capricorn";
  } else if (randomNumber == 2) {
    pcChosenCharacter = "Aquarius";
  } else {
    pcChosenCharacter = "Leo";
  }

  paragraphElement.innerHTML =
    "The PC has chosen " + pcChosenCharacter + " as its character";
  messageElement.appendChild(paragraphElement);
  characterCell.innerText = pcChosenCharacter;
  elementCell.innerText = characterElement(pcChosenCharacter);
  livesCell.innerText = pcLives;
  /*  */

  divOptionsSiblings[0].style.display = "none";
  divOptions.style.display = "none";

  document.getElementById("choose-attack-element").style.display = "block";
  document.getElementById("battlefield").style.display = "block";

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

  document.getElementById("battle-result").innerText = battleResult;
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
  if(playerLives == 0 || pcLives == 0){
    let finalResultElement =  document.getElementById("final-result");
    let result = (playerLives == 0) ? "PC has won the game!" : "Player has won the game!";

    document.getElementById("choose-attack-element").style.display = "none";
    document.getElementById("battlefield").style.display = "none";

    finalResultElement.style.display = "block";
    
    let finalResultMessageElement =  document.getElementById("final-result-msg");

    finalResultMessageElement.innerText = result;
  }
}

let playerChosenCharacter;
let pcChosenCharacter;
let playerVictories = 0;
let playerLives = 3;
let pcVictories = 0;
let pcLives = 3;
