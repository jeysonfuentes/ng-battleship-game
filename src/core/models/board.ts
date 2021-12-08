import { IShip } from "./ship";
import { ISlot } from "./slot";

export interface IBoard {
  slots: Array<Array<ISlot>>;
  ships: Array<IShip>;
}
