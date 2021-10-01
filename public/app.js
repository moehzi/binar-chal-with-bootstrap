const suitChoice = document.querySelectorAll(".suit-choice");
const textWinner = document.querySelector(".vs");
const suitChoiceCom = document.querySelectorAll(".suit-choice-com");
const resetBtn = document.querySelector(".refresh");
const suitContainerCom = document.querySelectorAll(".suitContainerCom");
const suitContainer = document.querySelectorAll(".suitContainer");
const choices = [
  {
    name: "rock",
    beat: "scissors",
  },
  {
    name: "paper",
    beat: "rock",
  },
  {
    name: "scissors",
    beat: "paper",
  },
];
init();
let playing = true;
function init() {
  suitContainer.forEach((item) => {
    item.classList.add("suitContainerHover");
    item.addEventListener("click", function () {
      if (playing) {
        item.classList.add("selectedBg");
        const selectionName = item.dataset.selection;
        const playerSelection = choices.find(
          (selection) => selection.name === selectionName
        );
        const comSelection = randomComputer();
        const playerWin = isWinner(playerSelection, comSelection);
        const comWin = isWinner(comSelection, playerSelection);
        if (playerWin) {
          displayStatus("Player Win");
        } else if (comWin) {
          displayStatus("COM Win");
        } else {
          displayStatus("DRAW");
          textWinner.classList.add("drawStatus");
        }
      }
    });
  });
}
function randomComputer() {
  randomNum = Math.trunc(Math.random() * choices.length);
  suitContainerCom[randomNum].classList.add("selectedBg");
  return choices[randomNum];
}
function isWinner(choices, opponentSelect) {
  textWinner.classList.add("winStatus");
  playing = false;
  suitContainer.forEach((item) => {
    item.classList.remove("suitContainerHover");
  });
  return choices.beat === opponentSelect.name;
}
function reset() {
  displayStatus("VS");
  textWinner.classList.remove("winStatus");
  textWinner.classList.remove("drawStatus");
  playing = true;
  suitContainer.forEach((item) => {
    item.classList.remove("selectedBg");
  });
  suitContainerCom[randomNum].classList.remove("selectedBg");
  init();
}
resetBtn.addEventListener("click", function () {
  reset();
});
function displayStatus(text) {
  textWinner.textContent = text;
}
