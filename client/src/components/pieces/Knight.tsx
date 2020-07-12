import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as KnightImage } from 'images/knight.svg';
import { SpotsContext } from 'context/SpotsContext';

// export default function Knight() {
//   return <KnightImage className="piece" />;
// }

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

interface Props {
  white: boolean;
  tileInfo: Position;
  //isOccupied: boolean;
  setStartPosition: Function;
  setAvailableMoves: Function;
  setTileFocus: Function;
}

export default function Knight(props: Props) {
  const { getSpotDetails } = useContext(SpotsContext);
  const {
    tileInfo,
    white,
    /*isOccupied,*/ setStartPosition,
    setAvailableMoves,
    setTileFocus,
  } = props;
  const [state, setState] = useState({
    hasUsedFirstMoved: false,
    isWhite: true,
    pieceType: 'knight',
    currentPosition: {
      tile: '',
      x: 0,
      y: 0,
    },
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isWhite: white, currentPosition: tileInfo }));
  }, [tileInfo, white]);

  const availableMovesChecker = (currentPosition: Position, x: number, y: number) => {
    const currentSquare = getSpotDetails(currentPosition.x, currentPosition.y);
    const square = getSpotDetails(currentPosition.x + x, currentPosition.y + y);
    if (square.isOccupied && square.activePiece.color !== currentSquare.activePiece.color) {
      return { x: square.tileInfo.x, y: square.tileInfo.y };
    } else if (!square.isOccupied) {
      return { x: square.tileInfo.x, y: square.tileInfo.y };
    } else {
      return { x: 0, y: 0 };
    }
  };

  const availableMoves = (currentPosition: Position) => {
    //code can be optimized perhaps

    return [
      availableMovesChecker(currentPosition, 2, 1),
      availableMovesChecker(currentPosition, 2, -1),
      availableMovesChecker(currentPosition, -2, 1),
      availableMovesChecker(currentPosition, -2, -1),
      availableMovesChecker(currentPosition, -1, 2),
      availableMovesChecker(currentPosition, 1, 2),
      availableMovesChecker(currentPosition, 1, -2),
      availableMovesChecker(currentPosition, -1, -2),
    ];
  };

  const onMoveStart = (
    currentPosition: Position,
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    console.log(currentPosition);
    let availMoves = availableMoves(currentPosition);
    setAvailableMoves(availMoves);
    setStartPosition(currentPosition, state.pieceType, state.isWhite ? 'white' : 'black');
    setTileFocus(currentPosition.tile);
  };

  return (
    <KnightImage
      className={`piece ${props.white ? 'white' : 'black'}`}
      onClick={(e) => {
        onMoveStart(state.currentPosition, e);
        // Example of how to use getSpotDetails
        console.log(getSpotDetails(state.currentPosition.x, state.currentPosition.y));
      }}
    />
  );
}
