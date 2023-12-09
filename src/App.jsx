import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentActivePlayer = "X";

  if (gameTurns.length > 0 && currentActivePlayer === gameTurns[0].player) {
    currentActivePlayer = "O";
  }
  return currentActivePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((item) => [...item])];
  let winner;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol == secondSquareSymbol &&
      firstSquareSymbol == thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }
  let hasDraw;
  if (gameTurns.length === 9 && !winner) {
    hasDraw = true;
  }

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((prev) => (prev === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      const currentActivePlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentActivePlayer,
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName="Player 1"
              isActive={activePlayer === "X" ? true : false}
              symbol="X"
            />
            <Player
              initialName="Player 2 "
              isActive={activePlayer === "O" ? true : false}
              symbol="O"
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver onRestart={handleRestart} winner={winner} />
          )}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
