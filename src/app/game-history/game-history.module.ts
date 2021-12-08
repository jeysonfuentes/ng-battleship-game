import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameHistoryRoutingModule } from './game-history-routing.module';
import { GameHistoryComponent } from './game-history.component';


@NgModule({
  declarations: [
    GameHistoryComponent
  ],
  imports: [
    CommonModule,
    GameHistoryRoutingModule
  ]
})
export class GameHistoryModule { }
