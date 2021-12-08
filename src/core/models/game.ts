import { IBoard } from './board';
import { ISettings } from "./settings";

export interface IGame {
  settings: ISettings;
  state: string;
  totalShootCount: number;
  totalShipsDestroyed: number;
  board: IBoard;
}
