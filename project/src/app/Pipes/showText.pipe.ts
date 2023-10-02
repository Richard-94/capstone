import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showText'
})
export class ShowTextPipe implements PipeTransform {

  transform(value: string, limit?:number): any {
    if(!value){
      return null;
    }
    value = value.toLowerCase();

  }

}
