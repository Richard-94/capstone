import { Pipe, PipeTransform } from '@angular/core';
import { Activities } from '../Enum/activities.enum';

@Pipe({
  name: 'removeHyphen'
})
export class RemoveHyphenPipe implements PipeTransform {
  transform(value: Activities): string {
    switch (value) {
      case Activities.CACCIA_AL_TESORO:
        return 'Caccia';
      case Activities.LABORATORI_CREATIVI:
        return 'Lab';
        case Activities.SPETTACOLI_DI_MAGIA:
        return 'Spettacoli';

      default:
        return 'Unknown Activity';
    }
  }

}
