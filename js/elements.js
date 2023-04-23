window.addEventListener("load", setEventListeners);

function setEventListeners() {
  let selectCharacterBtn = document.getElementById("choose-character-btn");
  selectCharacterBtn.addEventListener("click", choosePlayerCharacter);
}

function disableElement(elementId) {
  document.getElementById(elementId).disabled = true;
}

function choosePlayerCharacter() {
  let playerChosenCharacter;
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
}
