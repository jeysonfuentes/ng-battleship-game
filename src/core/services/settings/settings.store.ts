import { ISettings } from 'src/core/models/settings';

export interface SettingsStore {
  settings: ISettings;
}

export enum SettingsStoreActions {
  setSettings = 'SET_SETTINGS',
  getSettings = 'GET_SETTINGS',
}
