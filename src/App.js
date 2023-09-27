import React, { Component }  from 'react';
import { useState } from 'react';

export default function Game()
{
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  let moves = [];
  //updateMoves();
  const [renderedMoves, setRenderedMoves] = useState(moves);
  function handlePlay(nextSquares)
    {

      console.log("handle play called");
      updateMoves(setRenderedMoves);
      setRenderedMoves(moves.slice(0));
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      setXIsNext(!xIsNext);
    }

  //squares returns each element, move return each index
  //console.log("game runs now");



    function updateMoves()
    {
        moves = [];
        //console.log("NEW LOOP")
        for(let i = 0; i < history.length; i++)
        {
            //console.log(i, " ", history.length);
            let description;
            if(i > 0)
              description = 'Go to move # ' + i;
            else
              description = "Go to game start";

            if(i === history.length - 1)
            {
            //console.log("PUSHING FINAL MOVE " + i);
              moves.push(
                <li key = {i}> You are on move {i}</li>
              );
            }
            else moves.push(
              <li key = {i}>
                <button onClick = {() => jumpTo(i)}>{description}</button>
              </li>
            );
        };
        console.log("MOVES IS SIZE " + moves.length);
        console.log("HISTORY IS SIZE " + history.length);

    }




  function jumpTo(nextMove)
  {
    setCurrentMove(nextMove);
    setXIsNext(nextMove%2 === 0);
    setHistory(history.slice(0, currentMove + 1));
    console.log("called JumpTo");
    updateMoves();
    setRenderedMoves(moves);

  }

    console.log("UPDATING");
    return(
           <div className = "game">
             <div className = "game-board">
               <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
             </div>
             <div className = "game-info">
               <ol>{renderedMoves}</ol>
             </div>
           </div>
       );

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

  squareArray.push(<div> {status} </div>);
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


