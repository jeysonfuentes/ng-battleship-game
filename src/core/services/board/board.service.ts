import { Injectable } from '@angular/core';
import { IShip } from 'src/core/models/ship';
import { ICoordinate, ISlot } from 'src/core/models/slot';


@Injectable({
  providedIn: 'root',
})
export class BoardService {
  board: Array<ISlot[]> = [];
  ships: Array<IShip> = [
    {
      length: 4,
      id: 1,
      coordinates: [],
      isDestroyed: false,
    },
    {
      length: 3,
      id: 2,
      coordinates: [],
      isDestroyed: false,
    },
    {
      length: 3,
      id: 3,
      coordinates: [],
      isDestroyed: false,
    },
    {
      length: 2,
      id: 4,
      coordinates: [],
      isDestroyed: false,
    },
    {
      length: 2,
      id: 5,
      coordinates: [],
      isDestroyed: false,
    },
    {
      length: 2,
      id: 6,
      coordinates: [],
      isDestroyed: false,
    },
    {
      length: 1,
      id: 7,
      coordinates: [],
      isDestroyed: false,
    },
    {
      length: 1,
      id: 8,
      coordinates: [],
      isDestroyed: false,
    },
    {
      length: 1,
      id: 9,
      coordinates: [],
      isDestroyed: false,
    },
    {
      length: 1,
      id: 10,
      coordinates: [],
      isDestroyed: false,
    },
  ];
  constructor() {}

  createBoard(size: number = 10): Array<ISlot[]> {
    this.board = [];
    this.setEmptyBoard(size);
    this.setAllShipsOnBoard(size);
    return this.board;
  }

  getBoard(): Array<ISlot[]> {
    return this.board;
  }

  getShips(): Array<IShip> {
    return this.ships;
  }

  private setEmptyBoard(size: number) {
    let emptyBoard = [] as Array<ISlot[]>;
    for (let x = 0; x < size; x++) {
      emptyBoard[x] = [];
      for (let y = 0; y < size; y++) {
        emptyBoard[x][y] = {
          isSelected: false,
          isShip: false,
          shipId: 0,
          coordinates: { x, y, isRevealed: false },
        } as ISlot;
      }
    }
    this.board = emptyBoard;
  }

  private setAllShipsOnBoard(sizeBoard: number) {
    for (let i = 0; i < this.ships.length; i++) {
      this.buildShip(this.ships[i], sizeBoard);
    }
  }

  private buildShip(ship: IShip, sizeBoard: number) {
    let boardCopy = JSON.parse(JSON.stringify(this.board));
    let direction = this.getDirection();
    ship.coordinates = [];
    let startPoint: ICoordinate = {
      x: this.getRandomInt(0, sizeBoard - 1),
      y: this.getRandomInt(0, sizeBoard - 1),
      isRevealed: false,
    };
    let currentPoint;
    for (let i = 1; i <= ship.length; i++) {
      let nextPoint: any =
        i === 1 ? startPoint : this.getNextPoint(currentPoint, direction);

      if (!this.isValidPoint(nextPoint)) {
        this.buildShip(ship, sizeBoard);
        return;
      }

      this.setIsShip(boardCopy, nextPoint, ship);
      currentPoint = nextPoint;
      ship.coordinates.push(currentPoint);
    }
    this.board = boardCopy;
  }

  private isValidPoint(point: ICoordinate) {
    //Validate in the board
    if (!this.board[point.x] || !this.board[point.x][point.y]) {
      return false;
    }

    //Validate the collision point
    if (this.board[point.x][point.y].isShip) {
      return false;
    }

    return true;
  }

  private getDirection() {
    let direction = ['left', 'right', 'up', 'down'];
    let directionIndex = this.getRandomInt(0, 3);
    return direction[directionIndex];
  }

  private setIsShip(board: Array<ISlot[]>, point: ICoordinate, ship: IShip) {
    let selectedSquare = Object.assign({}, board[point.x][point.y]);
    selectedSquare.isShip = true;
    selectedSquare.shipId = ship.id;
    board[point.x][point.y] = selectedSquare;
  }

  private getNextPoint(currentPoint: ICoordinate, direction: string) {
    let nextPoint: ICoordinate = { x: 0, y: 0, isRevealed: false };
    switch (direction) {
      case 'left':
        nextPoint.x = currentPoint.x;
        nextPoint.y = currentPoint.y - 1;
        break;
      case 'right':
        nextPoint.x = currentPoint.x;
        nextPoint.y = currentPoint.y + 1;
        break;
      case 'up':
        nextPoint.x = currentPoint.x - 1;
        nextPoint.y = currentPoint.y;
        break;
      case 'down':
        nextPoint.x = currentPoint.x + 1;
        nextPoint.y = currentPoint.y;
        break;
      default:
        throw new Error('Invalid direction');
    }
    return nextPoint;
  }

  private getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
