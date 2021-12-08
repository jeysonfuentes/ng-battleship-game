import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IShip } from 'src/core/models/ship';
import { ISlot } from 'src/core/models/slot';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() slots: Array<Array<ISlot>>;
  @Input() totalShootCount: number;
  @Input() gameTurns: number;
  @Output() selectSlot = new EventEmitter<ISlot>();
  titleColumns: Array<string> = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
  ];

  launchMissile(slot: ISlot): void {
    this.selectSlot.emit(slot);
  }
}
