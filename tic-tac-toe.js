function createGameboard() {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const winnersCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    let freeBoard = board.filter((board) => board == 0);
    console.log(freeBoard);
    for (let k = 0; k < winnersCombinations.length; k++) {
      const [a, b, c] = winnersCombinations[k];
      if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      } else if (freeBoard.length == 0) {
        return 3;
      }
    }
  };

  const restartBoard = () => {
    for (let k = 0; k < board.length; k++) {
      board[k] = 0;
    }
  };

  const getBoard = () => board;

  const setToken = (player, position) => {
    if (board[position] == 0) {
      board[position] = player;
      return true;
    } else {
      console.log("Celda Ocupada, Elija otra");
      return false;
    }
  };

  const printBoard = () => console.log(board);

  return { printBoard, setToken, getBoard, checkWinner, restartBoard };
}

function gameController() {
  const GameBoard = createGameboard();
  const players = [{ token: 1 }, { token: 2 }];

  let activePlayer = players[0];

  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printGanador = (winner) => {
    const ganador = document.getElementById("winner");
    ganador.innerHTML = "";
    let parrafo = document.createElement("p");
    if (winner != "Empate") parrafo.textContent = `Ganador Jugador : ${winner}`;
    else parrafo.textContent = `Empate!`;
    ganador.appendChild(parrafo);
  };

  const playRound = (position) => {
    let canSet = GameBoard.setToken(getActivePlayer().token, position);
    if (canSet) switchPlayer();
    let winnerCheck = GameBoard.checkWinner();
    if (winnerCheck == 1 || winnerCheck == 2) {
      let player;
      if (winnerCheck == 1) player = "X";
      else if (winnerCheck == 2) player = "O";
      printGanador(player);
      GameBoard.restartBoard();
    } else if (winnerCheck == 3) {
      printGanador("Empate");
      GameBoard.restartBoard();
    }
    displayBoard();
  };

  const displayBoard = () => {
    actualBoard = GameBoard.getBoard();
    console.log(actualBoard);
    const app = document.getElementById("app");
    app.innerHTML = "";
    for (let i = 0; i < actualBoard.length; i++) {
      let player;
      if (actualBoard[i] == 1) player = "X";
      else if (actualBoard[i] == 2) player = "O";
      else player = "";
      const div = document.createElement("div");
      div.id = `${i}`;
      div.onclick = function () {
        playRound(this.id);
      };
      div.classList += "cell";
      div.innerHTML = `<h2>${player}</h2>`;
      app.appendChild(div);
    }
  };

  return { playRound, getActivePlayer, displayBoard };
}

const game = gameController();
game.displayBoard();
