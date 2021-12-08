import { ObservableStore } from '@codewithdan/observable-store';
import { Injectable } from '@angular/core';
import { APP_CONSTANTS, LEVELS_GAME, STATE_GAME } from 'src/core/constants/app.constants';
import { GameStore, GameStoreActions } from './game.store';
import { of } from 'rxjs';
import { IGame } from 'src/core/models/game';
import { BoardService } from '../board/board.service';

@Injectable({
  providedIn: 'root',
})
export class GameService extends ObservableStore<GameStore> {
  constructor(public boardService: BoardService) {
    super({ trackStateHistory: true });
    const initialState: GameStore = {
      games: [],
      currentGame: {
        board: {
          slots: this.boardService.createBoard(APP_CONSTANTS.BOARD_SIZE),
          ships: this.boardService.getShips(),
        },
        settings: {
          level: LEVELS_GAME[0].name,
          gameTurns: LEVELS_GAME[0].gameTurns,
          playerName: 'Guest',
        },
        state: STATE_GAME.INGAME,
        totalShootCount: 0,
        totalShipsDestroyed: 0,
      },
    };
    this.setState(initialState, 'INIT_STATE');
  }

  getCurrentGame() {
    const { currentGame } = this.getState();
    return of(currentGame);
  }

  setCurrentGame(currentGame: IGame) {
    let state = this.getState();
    state.currentGame = currentGame;
    this.setState(
      { currentGame: state.currentGame },
      GameStoreActions.setCurrentGame
    );
  }

  addGame(game: IGame) {
    let state = this.getState();
    state.games.push(game);
    this.setState({ games: state.games }, GameStoreActions.addGame);
  }

  getGames() {
    let { games } = this.getState();
    return of(games);
  }


}
