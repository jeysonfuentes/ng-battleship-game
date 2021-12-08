import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LEVELS_GAME } from 'src/core/constants/app.constants';
import { ILevel, ISettings } from 'src/core/models/settings';
import { SettingsService } from 'src/core/services/settings/settings.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  levels: Array<ILevel> = LEVELS_GAME;

  settings: ISettings;
  settings$: Subscription;
  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) {
    this.settingsForm = new FormGroup({
      playerName: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      gameTurns: new FormControl('', Validators.required),
    });
  }
  ngOnDestroy(): void {
    if (this.settings$) {
      this.settings$.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.settings$ = this.settingsService.stateChanged.subscribe((state) => {
      this.settings = state.settings;
      this.settingsForm.patchValue({
        playerName: state.settings.playerName,
        level: state.settings.level,
        gameTurns: state.settings.gameTurns,
      });
    });
  }

  changeLevel() {
    const levelCustom = this.settingsForm.value.level === this.levels[0].name;
    const level = this.levels.find(x => x.name === this.settingsForm.value.level)!
    this.settingsForm.patchValue({
      gameTurns: level.gameTurns,
    });
    if (levelCustom){
      this.settingsForm.get('gameTurns')!.enable()
    }else{
      this.settingsForm.get('gameTurns')!.disable()
    }
  }

  saveSettings(event: Event) {
    event.preventDefault();
    if (this.settingsForm.valid) {
      this.settings.playerName = this.settingsForm.controls['playerName'].value;
      this.settings.level = this.settingsForm.controls['level'].value;
      this.settings.gameTurns = this.settingsForm.controls['gameTurns'].value;
      this.settingsService.setSettings(this.settings);
      Swal.fire({
        title: 'Settings Saved!',
        text: 'Do you want go to Game Board with this settings?',
        showConfirmButton: true,
        icon: 'success',
        showCancelButton: true,
        allowOutsideClick: false,
        focusCancel: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['game']);
        }
      });
    }
  }
}
