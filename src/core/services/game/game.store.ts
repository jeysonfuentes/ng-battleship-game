import { IGame } from "src/core/models/game";

export interface GameStore {
  games: Array<IGame>
  currentGame: IGame
}

export enum GameStoreActions {
  addGame = 'ADD_GAME',
  getGames = 'GET_GAMES',
  getCurrentGame = 'GET_CURRENT_GAME',
  setCurrentGame = 'SET_CURRENT_GAME',
}
