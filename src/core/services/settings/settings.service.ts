import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { of } from 'rxjs';
import { LEVELS_GAME } from 'src/core/constants/app.constants';
import { ISettings } from 'src/core/models/settings';
import { SettingsStore, SettingsStoreActions } from './settings.store';

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends ObservableStore<SettingsStore> {
  constructor() {
    super({ trackStateHistory: true });
    const initialState: SettingsStore = {
      settings: {
        playerName: 'Guest',
        level: LEVELS_GAME[0].name,
        gameTurns: LEVELS_GAME[0].gameTurns,
      },
    };

    this.setState(initialState, 'INIT_STATE');
  }

  getSettings() {
    const { settings } = this.getState();
    return of(settings);
  }

  setSettings(settings: ISettings) {
    const state = this.getState();
    state.settings = settings;
    this.setState(
      { settings: state.settings },
      SettingsStoreActions.setSettings
    );
  }
}
