const chooseCharacterElement = document.getElementById("choose-character");
const battlefieldElement = document.getElementById("battlefield");
const finalResultElement = document.getElementById("final-result");
const subtitleElement = document.getElementById("subtitle");
const pcStatusInfoElement = document.getElementById("pc-status-info");
const playerStatusInfoElement = document.getElementById("player-status-info");


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

  const chooseCharacterOptionsElement = document.getElementById("choose-character-options");
  let characterElements;
  let capitalizedName;
  allCharacters.forEach(character => {
    capitalizedName = character.name.charAt(0).toUpperCase() + character.name.slice(1);
    characterElements = `<input type="radio" name="character" id="${character.name}" value="${capitalizedName}" />
    <label for="${character.name}">
       <img src="${character.image}" alt="${capitalizedName}" class="first-card-character-img" />
       <p>${capitalizedName}</p>
    </label>`;

    chooseCharacterOptionsElement.innerHTML += characterElements;
  });
}

function choosePlayerCharacter() {
  let characters = document.getElementsByName("character");

  let characterCell = document.getElementById("player-character");


  let parentElement = document.getElementById("player-character-img");
  let playerCharacterImage;

  for (let i = 0; i < characters.length; i++) {
    if (characters[i].checked == true) {
      playerChosenCharacter = characters[i].value;
    }
  }

  choosePcCharacter();

  characterCell.innerText = playerChosenCharacter;
  playerStatusInfoElement.appendChild(displayHearts(playerLives));

  playerCharacterImage = selectCharacterImage(playerChosenCharacter, false);
  parentElement.insertBefore(playerCharacterImage, parentElement.firstChild);
}

function choosePcCharacter() {
  let randomNumber = randomNumberGivenARange(1, 3);

  let characterCell = document.getElementById("pc-character");

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
  pcStatusInfoElement.appendChild(displayHearts(pcLives));

  pcCharacterImage = selectCharacterImage(pcChosenCharacter, false);
  parentElement.insertBefore(pcCharacterImage, parentElement.firstChild);

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

class CreateCharacter{
  constructor(name, image){
    this.name = name;
    this.image = image;
  }
}

let capricornCharacter = new CreateCharacter("capricorn", "./assets/goat.png");
let aquariusCharacter = new CreateCharacter("aquarius", "./assets/koi.png");
let leoCharacter = new CreateCharacter("leo", "./assets/lion.png");

let allCharacters = [];

allCharacters.push(capricornCharacter, aquariusCharacter, leoCharacter);



let playerChosenCharacter;
let pcChosenCharacter;
let playerVictories = 0;
let playerLives = 3;
let pcVictories = 0;
let pcLives = 3;
