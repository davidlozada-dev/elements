window.addEventListener("load", setEventListeners);

function setEventListeners() {
  document.getElementById("choose-attack-element").style.display = "none";
  document.getElementById("battlefield").style.display = "none";
  document.getElementById("final-result").style.display = "none";

  let selectCharacterBtn = document.getElementById("choose-character-btn");
  selectCharacterBtn.addEventListener("click", choosePlayerCharacter);
}

function disableElement(elementId) {
  document.getElementById(elementId).disabled = true;
}

function choosePlayerCharacter() {
  let characters = document.getElementsByName("character");
  let messageElement = document.getElementById("choose-character-msg");
  let paragraphElement = document.createElement("p");

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
}

function choosePcCharacter() {
  let randomNumber = randomNumberGivenARange(1, 3);
  let messageElement = document.getElementById("choose-character-msg");
  let paragraphElement = document.createElement("p");
  let divOptions = document.getElementById("choose-character-options");
  let divOptionsSiblings = document.querySelectorAll("#choose-character h2");

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

  divOptionsSiblings[0].style.display = "none";
  divOptions.style.display = "none";

  document.getElementById("choose-attack-element").style.display = "block";
  document.getElementById("battlefield").style.display = "block";
}

function randomNumberGivenARange(min, max) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

  return randomNumber;
}

let playerChosenCharacter;
let pcChosenCharacter;
