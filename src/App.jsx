import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [empate, setEmpate] = useState(null);


  function handleClick(index) {
    if (winner) return;
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinner(currentPlayer);
        confetti()
        return;
      } else if (newBoard.find(item => { return (item == null) }) === undefined && winner) {
        setEmpate(true)
      }
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  function renderSquare(index) {
    return (
      <button className='casillas'
        key={index}
        onClick={() => handleClick(index)}>
        {board[index] || ' '}
      </button>
    );
  }

  function resetBoard() {
    setBoard(Array(9).fill(null));
    setWinner(null)
    setEmpate(null)
  }

  return (
    <div>
      <h1 className='text-white'>Tic Tac Toe</h1>
      <div className='tablero'>
        {board.map((_, index) => {
          return (
            renderSquare(index)
          )
        })}
      </div>
      <button className='reset'
        onClick={resetBoard}>
        Reset
      </button>
      {winner && <h2 className='text-white'>EL ganador es: {winner}</h2>}
      {empate && <h2 className='text-white'>Hay un epmate</h2>}
    </div>
  )
}

export default App
