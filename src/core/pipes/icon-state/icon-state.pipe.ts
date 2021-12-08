import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconState'
})
export class IconStatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
