'use client';

import React, { useState } from 'react';
import styles from './TicTacToe.module.css';

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    // Get winner data before checking
    const winnerData = calculateWinner(squares);
    
    // Prevent click if square is already filled or game is won
    if (squares[index] !== null || winnerData) {
      return;
    }
    
    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winnerData = calculateWinner(squares);
  const winner = winnerData?.winner;
  const winningLine = winnerData?.line;
  const isBoardFull = squares.every(square => square !== null);
  
  let status;
  if (winner) {
    status = `🎉 Winner: ${winner}`;
  } else if (isBoardFull) {
    status = "🤝 It's a Draw!";
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  // Helper function to check if current square is in winning line
  const isWinningSquare = (index) => {
    return winningLine && winningLine.includes(index);
  };

  // Get the appropriate winner class based on who won
  const getWinnerClass = () => {
    if (!winner) return '';
    return winner === 'X' ? styles.winnerX : styles.winnerO;
  };

  // Get board class based on winner
  const getBoardClass = () => {
    if (!winner) return styles.board;
    return winner === 'X' 
      ? `${styles.board} ${styles.boardWinnerX}` 
      : `${styles.board} ${styles.boardWinnerO}`;
  };

  return (
    <div className={styles.ticTacToe}>
      <h1 className={styles.status}>{status}</h1>
      
      <div className={getBoardClass()}>
        {squares.map((value, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`${styles.square} ${isWinningSquare(index) ? getWinnerClass() : ''}`}
            data-value={value}
          >
            {value}
          </button>
        ))}
      </div>

      <button 
        className={styles.restartBtn}
        onClick={handleRestart}
      >
        🔄 Restart Game
      </button>
    </div>
  );
}

// Helper function to calculate winner and return winning line
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal \
    [2, 4, 6], // Diagonal /
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c]
      };
    }
  }
  return null;
}
