import { Component, Input, OnInit } from '@angular/core';
import { IShip } from 'src/core/models/ship';
import { ISlot } from 'src/core/models/slot';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @Input() slots: Array<Array<ISlot>>;
  @Input() ships: Array<IShip>;
  constructor() {}

  ngOnInit(): void {}
}
