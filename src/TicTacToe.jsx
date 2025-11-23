import { useState } from 'react'
import './TicTacToe.css'

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameStatus, setGameStatus] = useState('playing') // 'playing', 'won', 'draw'

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = (index) => {
    if (board[index] || gameStatus !== 'playing') {
      return
    }

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)

    const winner = calculateWinner(newBoard)
    if (winner) {
      setGameStatus('won')
    } else if (newBoard.every(square => square !== null)) {
      setGameStatus('draw')
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setGameStatus('playing')
  }

  const winner = calculateWinner(board)
  const isDraw = gameStatus === 'draw' && !winner

  const getStatusMessage = () => {
    if (winner) {
      return `Winner: ${winner}! 🎉`
    }
    if (isDraw) {
      return "It's a Draw! 🤝"
    }
    return `Next player: ${isXNext ? 'X' : 'O'}`
  }

  const renderSquare = (index) => {
    return (
      <button
        className={`square ${board[index] ? `square-${board[index].toLowerCase()}` : ''} ${gameStatus !== 'playing' ? 'game-ended' : ''}`}
        onClick={() => handleClick(index)}
        disabled={gameStatus !== 'playing'}
      >
        {board[index]}
      </button>
    )
  }

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <div className="status">{getStatusMessage()}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  )
}

export default TicTacToe

