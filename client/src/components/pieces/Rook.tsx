import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as RookImage } from 'images/rook.svg';
import { SpotsContext } from 'context/SpotsContext';
import RookAvailableMoves from 'components/availableMoves/rookAvailableMoves';
import Position from 'components/interfaces/position';

interface Props {
  white: boolean;
  tileInfo: Position;
  setStartPosition: Function;
  setAvailableMoves: Function;
  setTileFocus: Function;
  turn: number;
  endPawn: {
    flag: boolean;
    color: string;
  };
}

export default function Rook(props: Props) {
  const { getSpotDetails } = useContext(SpotsContext);
  const {
    tileInfo,
    white,
    setStartPosition,
    setAvailableMoves,
    setTileFocus,
    turn,
    endPawn,
  } = props;
  const [state, setState] = useState({
    hasUsedFirstMoved: false,
    pieceType: 'rook',
    isWhite: true,
    currentPosition: {
      tile: '',
      x: 0,
      y: 0,
    },
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, isWhite: white, currentPosition: tileInfo }));
  }, [tileInfo, white]);

  const onMoveStart = (
    currentPosition: Position,
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    let availMoves = RookAvailableMoves(currentPosition, getSpotDetails);
    setAvailableMoves(availMoves);
    setStartPosition(currentPosition, state.pieceType, state.isWhite ? 'white' : 'black');
    setTileFocus(currentPosition.tile);
  };

  return (
    <RookImage
      className={`piece ${props.white ? 'white' : 'black'}`}
      onClick={(e) => {
        if (!endPawn.flag) {
          if (!turn && props.white) {
            onMoveStart(state.currentPosition, e);
          } else if (turn && !props.white) {
            onMoveStart(state.currentPosition, e);
          }
        }
      }}
    />
  );
}
