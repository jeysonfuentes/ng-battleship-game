import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameHistoryComponent } from './game-history.component';

const routes: Routes = [{
  path: '',
  component: GameHistoryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameHistoryRoutingModule { }
