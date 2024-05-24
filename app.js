let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameContainer = document.querySelector(".game-container");

let turnO = true;
let count = 0;

let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
  gameContainer.classList.remove("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      box.style.color = "#030027";
    } else {
      box.innerText = "X";
      turnO = true;
      box.style.color = "#C16E70";
    }
    count++;
    box.disabled = true;
    checkWinner();
  });
});

const showWinner = (winner) => {
  msg.innerText = `Congraturations! Winner is "${winner}"`;
  msgContainer.classList.remove("hide");
  gameContainer.classList.add("hide");
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = `It's a Draw!"`;
  msgContainer.classList.remove("hide");
  gameContainer.classList.add("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return;
    }
  }

  if (count >= 9) {
    gameDraw();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
