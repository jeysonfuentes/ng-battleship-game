import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SettingsInformationComponent } from './settings-information/settings-information.component';
import { BoardComponent } from './board/board.component';


@NgModule({
  declarations: [
    GameComponent,
    SettingsInformationComponent,
    BoardComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    SweetAlert2Module
  ]
})
export class GameModule { }
