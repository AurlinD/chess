import React from 'react';

interface Props {
  check: string;
  isGameOver: boolean;
  typeOfWin: string;
}

export default function checkDisplay(props: Props) {
  const { check, isGameOver, typeOfWin } = props;
  let message;
  if (typeOfWin === 'checkmate') {
    message = 'CheckMate!';
  }
  if (typeOfWin === 'timeout white') {
    message = 'Black Wins!';
  }
  if (typeOfWin === 'timeout black') {
    message = 'White Wins!';
  }
  // visibility: 'hidden'
  return (
    <div
      className='checkDisplay'
      style={check || isGameOver ? { display: 'block' } : { visibility: 'hidden' }}
    >
      {isGameOver ? `${message}` : ` ${check} is in check!`}
    </div>
  );
}
