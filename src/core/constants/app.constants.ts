import { ILevel } from '../models/settings';

export const LEVELS_GAME: Array<ILevel> = [
  {
    name: 'Custom',
    gameTurns: 10,
    isEditable: true,
  },
  {
    name: 'Easy',
    gameTurns: -1,
    isEditable: false,
  },
  {
    name: 'Moderate',
    gameTurns: 100,
    isEditable: false,
  },
  {
    name: 'Hard',
    gameTurns: 50,
    isEditable: false,
  },
];

export const STATE_GAME = {
  WIN: 'WIN',
  LOSE: 'LOSE',
  INGAME: 'IN GAME',
};

export const APP_CONSTANTS = {
  BOARD_SIZE: 10
}
