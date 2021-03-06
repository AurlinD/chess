import { Spots } from 'context/SpotsContext';

interface Position {
  tile: string;
  x: number;
  y: number;
  isOccupied?: boolean;
  isFriendly?: boolean;
}

export default function queenAvailableMoves(currentPosition: Position, getSpotDetails: Function) {
  //code can be optimized perhaps
  let diagonal = [];

  // BISHOP DIRECTIONS
  let i: number = currentPosition.x;
  let j: number = currentPosition.x;
  let k: number = currentPosition.x;
  let l: number = currentPosition.x;

  let b: number = currentPosition.y;
  let c: number = currentPosition.y;
  let d: number = currentPosition.y;
  let e: number = currentPosition.y;

  //ROOK DIRECTIONS
  let m: number = currentPosition.x;
  let n: number = currentPosition.x;
  let f: number = currentPosition.y;
  let g: number = currentPosition.y;

  const currentSpot: Spots | undefined = getSpotDetails(currentPosition.x, currentPosition.y);

  // ------------------------------BISHOP FOR LOOPS-----------------------------------------
  for (i; i < 9; i++) {
    let downRight = { x: i, y: b-- };
    if (downRight.y < 1 || downRight.y > 8) {
      break;
    }

    if (i === currentPosition.x) {
      continue;
    }

    let downRightSquare: Spots | undefined = getSpotDetails(downRight.x, downRight.y);

    if (downRightSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== downRightSquare.activePiece.color) {
        diagonal.push(downRight);
        break;
      } else {
        break;
      }
    } else {
      diagonal.push(downRight);
    }
  }

  for (j; j < 9; j++) {
    let upRight = { x: j, y: c++ };
    if (upRight.y < 1 || upRight.y > 8) {
      break;
    }
    if (j === currentPosition.x) {
      continue;
    }
    let upRightSquare: Spots | undefined = getSpotDetails(upRight.x, upRight.y);
    if (upRightSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== upRightSquare.activePiece.color) {
        diagonal.push(upRight);
        break;
      } else {
        break;
      }
    } else {
      diagonal.push(upRight);
    }
  }
  for (k; k > 0; k--) {
    let downLeft = { x: k, y: d-- };
    if (downLeft.y < 1 || downLeft.y > 8) {
      break;
    }

    if (k === currentPosition.x) {
      continue;
    }
    let downLeftSquare: Spots | undefined = getSpotDetails(downLeft.x, downLeft.y);
    if (downLeftSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== downLeftSquare.activePiece.color) {
        diagonal.push(downLeft);
        break;
      } else {
        break;
      }
    } else {
      diagonal.push(downLeft);
    }
  }

  for (l; l > 0; l--) {
    let upLeft = { x: l, y: e++ };
    if (upLeft.y < 1 || upLeft.y > 8) {
      break;
    }
    if (l === currentPosition.x) {
      continue;
    }
    let upLeftSquare: Spots | undefined = getSpotDetails(upLeft.x, upLeft.y);
    if (upLeftSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== upLeftSquare.activePiece.color) {
        diagonal.push(upLeft);
        break;
      } else {
        break;
      }
    } else {
      diagonal.push(upLeft);
    }
  }

  //--------------------------------- ROOK FOR LOOPS-------------------------

  for (m; m < 9; m++) {
    let rightRow = { x: m, y: currentPosition.y };

    if (m === currentPosition.x) {
      continue;
    }

    let rightSquare: Spots | undefined = getSpotDetails(rightRow.x, rightRow.y);

    if (rightSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== rightSquare.activePiece.color) {
        diagonal.push(rightRow);
        break;
      } else {
        break;
      }
    } else {
      diagonal.push(rightRow);
    }
  }
  for (n; n > 0; n--) {
    let leftRow = { x: n, y: currentPosition.y };

    if (n === currentPosition.x) {
      continue;
    }

    let leftSquare: Spots | undefined = getSpotDetails(leftRow.x, leftRow.y);

    if (leftSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== leftSquare.activePiece.color) {
        diagonal.push(leftRow);
        break;
      } else {
        break;
      }
    } else {
      diagonal.push(leftRow);
    }
  }
  for (f; f < 9; f++) {
    let upRow = { x: currentPosition.x, y: f };

    if (f === currentPosition.y) {
      continue;
    }

    let upSquare: Spots | undefined = getSpotDetails(upRow.x, upRow.y);

    if (upSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== upSquare.activePiece.color) {
        diagonal.push(upRow);
        break;
      } else {
        break;
      }
    } else {
      diagonal.push(upRow);
    }
  }
  for (g; g > 0; g--) {
    let downRow = { x: currentPosition.x, y: g };

    if (g === currentPosition.y) {
      continue;
    }

    let downSquare: Spots | undefined = getSpotDetails(downRow.x, downRow.y);

    if (downSquare?.isOccupied) {
      if (currentSpot?.activePiece.color !== downSquare.activePiece.color) {
        diagonal.push(downRow);
        break;
      } else {
        break;
      }
    } else {
      diagonal.push(downRow);
    }
  }

  return diagonal;
}
