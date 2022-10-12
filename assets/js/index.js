import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here

window.addEventListener("DOMContentLoaded", event => {
  const gameBoard = document.createElement("main");
  gameBoard.setAttribute("id", "board");
  board.grid.forEach((row, i) => {
    row.forEach((box, j) => {
      const boardEl = document.createElement("div");
      boardEl.id = `${i}_${j}`;
      boardEl.className = "square";
      boardEl.dataset.row = i;
      boardEl.dataset.col = j;
      gameBoard.append(boardEl);
    });
  });

  document.body.appendChild(gameBoard);

  const gameOverMessage = document.createElement("h2");
  gameOverMessage.innerText = "You Win!";
  gameOverMessage.id = "game-over-msg";
  gameOverMessage.style.color = "transparent";
  document.getElementById("header").insertAdjacentElement("afterend", gameOverMessage);

  const resetButton = document.createElement("button");
  resetButton.setAttribute("type", "reset");
  resetButton.innerText = "Reset Game"
  resetButton.setAttribute("id", "reset");

  document.body.appendChild(resetButton);

  let checkClicks = (event) => {
    if (event.target.className === "square") {
      let hitOrMiss = board.makeHit(event.target.dataset.row, event.target.dataset.col);
      if (!hitOrMiss) {
        event.target.style.backgroundColor = "red";
      } else {
        event.target.style.backgroundColor = "green";
        event.target.innerText = hitOrMiss;
      }
    }
  };

  gameBoard.addEventListener("click", checkClicks);

  gameBoard.addEventListener("click", event => {
    if (board.isGameOver()) {
      const h2El = document.getElementById("game-over-msg");
      h2El.style.color = "blue";
      gameBoard.removeEventListener("click", checkClicks);
      let color = h2El.style.color;
      setInterval(() => {
        switch (color) {
          case "blue":
            h2El.style.color = "red";
            color = h2El.style.color;
            break;
          case "red":
            h2El.style.color = "green";
            color = h2El.style.color;
            break;
          case "green":
            h2El.style.color = "blue";
            color = h2El.style.color;
            break;
          default:
            h2El.style.color = "black";
        }
      }, 1000);
    }
  });

  document.getElementById("reset").addEventListener("click", event => {
    const reset = confirm("Reset?");
    if (reset) {
      window.location.reload();
    }
  });
})