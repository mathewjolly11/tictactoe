let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;
const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

const board = document.getElementById("board");
const statusText = document.getElementById("status");

// Generate cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  cell.addEventListener("click", handleClick);
  board.appendChild(cell);
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (gameBoard[index] !== "" || !isGameActive) return;

  gameBoard[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("disabled");

  const winCombo = checkWin();
  if (winCombo) {
    statusText.textContent = `${currentPlayer} Wins! 🎉`;
    isGameActive = false;
    highlightWin(winCombo);
  } else if (!gameBoard.includes("")) {
    statusText.textContent = "It's a Draw!";
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Turn: ${currentPlayer}`;
  }
}

function checkWin() {
  return winningCombinations.find(comb =>
    comb.every(index => gameBoard[index] === currentPlayer)
  );
}

function highlightWin(combo) {
  combo.forEach(index => {
    const cell = document.querySelector(`.cell[data-index="${index}"]`);
    cell.classList.add("win");
  });
}

function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  statusText.textContent = "Turn: X";
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("disabled", "win");
  });
}
