import { ICoordinate } from "./slot";

export interface IShip {
  id: number;
  length: number;
  coordinates: Array<ICoordinate>
  isDestroyed: boolean;
}
