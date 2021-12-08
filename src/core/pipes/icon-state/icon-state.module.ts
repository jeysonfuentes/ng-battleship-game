import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconStatePipe } from './icon-state.pipe';

@NgModule({
  declarations: [IconStatePipe],
  imports: [CommonModule],
  exports: [IconStatePipe],
})
export class IconStateModule {}
