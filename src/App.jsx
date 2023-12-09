import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((prev) => (prev === "X" ? "O" : "X"));

    setGameTurns((prevTurns) => {
      let currentActivePlayer = "X";

      if (prevTurns.length > 0 && currentActivePlayer === prevTurns[0].player) {
        currentActivePlayer = "O";
      }

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentActivePlayer,
        },
        ...prevTurns,
      ];
      console.log(updatedTurns);
      return updatedTurns;
    });
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
          <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
