import { Component, Input } from '@angular/core';
import { ISettings } from 'src/core/models/settings';

@Component({
  selector: 'app-settings-information',
  templateUrl: './settings-information.component.html',
  styleUrls: ['./settings-information.component.scss'],
})
export class SettingsInformationComponent  {
  @Input() settings: ISettings;
}
