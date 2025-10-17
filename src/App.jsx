import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Players from "./components/Players"
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from "./winning-combination.js";
import GameOver from "./components/GameOver.jsx";
const initialGameBoard=[
    [null,null,null],
    [null,null,null],
    [null,null,null],
]
function App() {
  const[activePlayer,SetActivePlayer]=useState("X");
  const[players,setPlayer]=useState({
    X:"Player 1",
    O:"Player 2",
  })
  const[gameTurns,setGameTurns]=useState([]);

 let gameBoard=[...initialGameBoard.map(array=>[...array])];
    for(const turn of gameTurns){
        const{square,player}=turn;
        const {row,col}=square;
        gameBoard[row][col]=player;
    }
let winner=null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column]
    if(firstSquareSymbol&&firstSquareSymbol===secondSquareSymbol&&firstSquareSymbol===thirdSquareSymbol){
      winner=players[firstSquareSymbol];
    }
  }
  const hasDraw=gameTurns.length===9&&!winner;

  function handleactiveplayerHandler(rowIndex,colIndex){
      // record the move using the current activePlayer, then toggle active player
      setGameTurns((preTurns)=>{
        const currentPlayer = activePlayer;
        const updatedTurns=[{
          square:{row:rowIndex,col:colIndex},
          player:currentPlayer
        },...preTurns];
        return updatedTurns;
      });
     SetActivePlayer((currentActivePlayer)=>(currentActivePlayer==="X"?"O":"X"));
  }
  function handleRestart(){
    setGameTurns([]);
  }
  function handlePlayernameChangle(symbol,newName) {
    setPlayer((preplayer)=>{
      return{
        ...preplayer,
        [symbol]:newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players onChangeName={handlePlayernameChangle} name="Player-1" symbol="X" isActive={activePlayer==="X"}/>
          <Players onChangeName={handlePlayernameChangle} name="Player-2" symbol="O" isActive={activePlayer==="O"}/>
        </ol>
        {(winner||hasDraw)&&<GameOver onRestart={handleRestart} winner={winner}/>}
        <GameBoard  board={gameBoard} onSelectSquare={handleactiveplayerHandler} activePlayer={activePlayer}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
