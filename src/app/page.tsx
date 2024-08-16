'use client'
import { useState } from "react";



export default function Home() {

  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null))
  const [ turn, setTurn] = useState<boolean>(true)
  const [ player1, setPlayer1] = useState<number>(0)
  const [ player2, setPlayer2] = useState<number>(0)
  const [ draw, setDraw] = useState<number>(0)
  

  const handleClick = (index: number) => {
    if (board[index] || checkWinner()) return; // prevent changing filled squares or playing after game end 
    const newBoard = board.slice()
    newBoard[index] = turn?'X':'O'
    setBoard(newBoard)
    
    const winner = checkWinner(newBoard)
    if (winner) {
      switch(winner){
        case 'X': 
        setPlayer1(player1 + 1)
        alert('Player1 win!!!')
        setBoard(Array(9).fill(null))
        setTurn(false)
        break;
        case 'O':
          setPlayer2(player2 + 1)
          alert('Player2 win!!!')
          setBoard(Array(9).fill(null))
          setTurn(true)
          break;
        default:
          setDraw(draw + 1)
          alert('Draw!!!')
          setBoard(Array(9).fill(null))
          setTurn(true)
          break;
      }
    }
    
      



    setTurn(!turn) // switch turn

  }

  const checkWinner = ( currentBoard = board) =>{
    const winningCombinations =[
      // horizont
      [0,1,2],
      [3,4,5],
      [6,7,8],
      
      //vertical
      [0,3,6],
      [1,4,7],
      [2,5,8],

      //diagonal
      [0,4,8], // diag1
      [2,4,6]  // diag2
    ]

    for(let combo of winningCombinations) {
      const [a,b,c] = combo
      if ( currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]){
        return currentBoard[a]
      }
    }
    return currentBoard.includes(null)? null : 'Draw' ; // if no winner and board is full, it's a draw
  }

  const reset = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(true)
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>TIC-TAC-TOE</h1>
      <div className="grid grid-cols-3 gap-3">
        <h1>
          Player 1: {player1}
        </h1>
        <h1>
          Draw: {draw}
        </h1>

      
        <h1>
        Player 2: {player2}
        </h1>

      </div>
      <div className="grid grid-cols-3 gap-3">
        {
          board.map((value, index) => (
            <button key={index} onClick={()=>{
              handleClick(index)
            }} className="border w-20 h-20 ">
              {value}
            </button>
          ))
        }
      </div>
      <button onClick={reset}>
          Reset game
        </button>


    </main>
  );
}
