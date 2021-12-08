import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItem } from './header.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  mainMenu: Array<IMenuItem> = [
    {
      text: 'Game',
      url: 'game',
    },
    {
      text: 'Game History',
      url: 'game-history',
    },
    {
      text: 'Settings',
      url: 'settings',
    },
    {
      text: 'About',
      url: 'about',
    },
  ];
}
