import React, { Component }  from 'react';
import { useState } from 'react';


var currentVal = 'X';



function Square({value, onSquareClick})
{
    return <button className = "square"
            onClick = {onSquareClick}>
            {value}
            </button>
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if(winner)
    status = "Winner: " + winner;
  else
    status = "Next player: " + (xIsNext ?  "X" : "O")
;
  function handleClick(i)
  {
    if(calculateWinner(squares) || squares[i])
        return;
    const nextSquares = squares.slice();
    if(xIsNext)
        nextSquares[i] = "X";
    else
        nextSquares[i] = "O";

    onPlay(nextSquares);

  }

  const squareArray = [];

  //squareArray.push(<div>);
  for(let i = 0; i < 3; i ++)
  {
    for(let j = 0; j < 3; j++)
    {
      squareArray.push(<Square value = {squares[i + 3*j]} onSquareClick = {() => handleClick(i + 3*j)}/>);
    }
    squareArray.push(<div className = "row"> </div>);
  }

  //squareArray.push(</div>);
  return squareArray;


}

export default function Game()
{
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  //squares returns each element, move return each index
  const moves = history.map((squares, move) => {
    let description;
    if(move > 0)
      description = 'Go to move # ' + move;
    else
      description = 'Go to game start';

    if(move == history.length - 1)
      return(
        <li key = {move}> You are on move {move}</li>
      )

    return (
      <li key = {move}>
        <button onClick = {() => jumpTo(move)}>{description}</button>
      </li>
    );
    });
  function jumpTo(nextMove)
  {
    setCurrentMove(nextMove);
    setXIsNext(nextMove%2 === 0);
  }



  function handlePlay(nextSquares)
  {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  return(
       <div className = "game">
         <div className = "game-board">
           <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
         </div>
         <div className = "game-info">
           <ol>{moves}</ol>
         </div>
       </div>
   );
}
