import { ISlot } from 'src/core/models/slot';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconState',
})
export class IconStatePipe implements PipeTransform {
  transform(value: ISlot): string {
    if (value.isShip && value.isSelected) {
      return `Ship #${value.shipId} 💀`;
    } else if (value.isSelected) {
      return '❌';
    } else {
      return '';
    }
  }
}
