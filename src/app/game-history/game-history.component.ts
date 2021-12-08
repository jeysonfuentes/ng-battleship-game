import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IGame } from 'src/core/models/game';
import { GameService } from 'src/core/services/game/game.service';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss'],
})
export class GameHistoryComponent implements OnInit, OnDestroy {
  gameHistory: IGame[] = [];
  games$: Subscription;
  constructor(private gameService: GameService) {}

  ngOnDestroy(): void {
    if (this.games$) {
      this.games$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.games$ = this.gameService.stateChanged.subscribe((state) => {
      this.gameHistory = state.games;
    });
  }
}
