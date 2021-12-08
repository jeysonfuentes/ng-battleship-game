export interface ISlot {
  isSelected: boolean;
  isShip: boolean;
  shipId?: number;
  coordinates: ICoordinate;
}

export interface ICoordinate {
  x: number;
  y: number;
  isRevealed: boolean;
}
