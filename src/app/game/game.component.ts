import { IGame } from 'src/core/models/game';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { IShip } from 'src/core/models/ship';
import { ISlot } from 'src/core/models/slot';

import {
  APP_CONSTANTS,
  LEVELS_GAME,
  STATE_GAME,
} from 'src/core/constants/app.constants';
import Swal from 'sweetalert2';
import { BoardService } from 'src/core/services/board/board.service';
import { GameService } from 'src/core/services/game/game.service';
import { SettingsService } from 'src/core/services/settings/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  currentGame: IGame;
  subscriptionGame$: Array<Subscription> = [];

  constructor(
    public boardService: BoardService,
    public gameService: GameService,
    public settingsService: SettingsService
  ) {}
  ngOnDestroy(): void {
    if (this.subscriptionGame$) {
      this.subscriptionGame$.forEach((subs) => subs.unsubscribe());
    }
  }

  ngOnInit(): void {
    const game$ = this.gameService.stateChanged.subscribe((state) => {
      this.currentGame = state.currentGame;
    });
    const settings$ = this.settingsService.stateChanged.subscribe((state) => {
      this.currentGame.settings = state.settings;
    });

    this.subscriptionGame$ = [...this.subscriptionGame$, game$, settings$];
  }

  initializeGame() {
    const currentGame = {
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
    };
    this.gameService.setCurrentGame(currentGame);
  }

  launchMissile(slot: ISlot): void {
    if (slot.isSelected) return;

    let selectedItem = { ...slot };
    selectedItem.isSelected = true;

    let board = [...this.currentGame.board.slots];
    board[slot.coordinates.x][slot.coordinates.y] = selectedItem;
    this.currentGame.totalShootCount += 1;

    if (selectedItem.shipId) {
      let ship = this.currentGame.board.ships.find(
        (x) => x.id === selectedItem.shipId
      )!;

      let coordinateShip = ship.coordinates.find(
        (coordinate) =>
          coordinate.x === selectedItem.coordinates.x &&
          coordinate.y === selectedItem.coordinates.y
      )!;

      coordinateShip.isRevealed = true;
      ship.isDestroyed = this.isShipDestroyed(ship);
      if (ship.isDestroyed) {
        this.currentGame.totalShipsDestroyed += 1;
        Swal.fire({
          title: `Ship #${ship.id} has destroyed!`,
          timer: 1300,
          showConfirmButton: false,
          icon: 'info',
        });
        let boardShip = board.filter((x) =>
          x.find((y) => y.shipId === ship.id)
        );
        boardShip.forEach((row) => {
          let slot = row.filter((x) => x.shipId === ship.id);
          slot.forEach((item) => (item.coordinates.isRevealed = true));
        });
      }
    }

    this.gameService.setCurrentGame(this.currentGame);

    if (this.currentGame.settings.gameTurns !== -1) {
      if (!this.isAllShipDestroyed() && this.isCompleteGameTurn()) {
        this.currentGame.state = STATE_GAME.LOSE;
        this.gameService.addGame(this.currentGame);
        Swal.fire({
          title: 'Game Over',
          text: 'the game turns has left, do you want restart?',
          showConfirmButton: true,
          icon: 'question',
          showCancelButton: false,
          allowOutsideClick: false,
          focusCancel: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.confirmRestart();
          }
        });
      }
    }
    if (this.isAllShipDestroyed() && this.hasGameTurns()) {
      this.currentGame.state = STATE_GAME.WIN;
      this.gameService.addGame(this.currentGame);
      Swal.fire({
        title: 'You WIN!',
        text: `Great your finish the game in ${this.currentGame.totalShootCount} shoots?, Do you want play again?`,
        showConfirmButton: true,
        icon: 'success',
        showCancelButton: true,
        allowOutsideClick: false,
        focusCancel: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.confirmRestart();
        }
      });
    }
  }

  confirmRestart() {
    this.initializeGame();
  }

  isShipDestroyed(ship: IShip): boolean {
    const coordinatesRevealed = ship.coordinates.filter((x) => x.isRevealed);
    return ship.length === coordinatesRevealed.length;
  }

  isAllShipDestroyed() {
    return (
      this.currentGame.totalShipsDestroyed ===
      this.currentGame.board.ships.length
    );
  }

  isCompleteGameTurn() {
    return (
      this.currentGame.totalShootCount === this.currentGame.settings.gameTurns
    );
  }

  hasGameTurns() {
    return (
      this.currentGame.totalShootCount <= this.currentGame.settings.gameTurns
    );
  }
}
