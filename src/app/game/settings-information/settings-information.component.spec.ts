import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsInformationComponent } from './settings-information.component';

describe('SettingsInformationComponent', () => {
  let component: SettingsInformationComponent;
  let fixture: ComponentFixture<SettingsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
