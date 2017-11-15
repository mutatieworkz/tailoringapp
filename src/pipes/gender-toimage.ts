import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the GenderToimagePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'genderToimage',
})
export class GenderToimagePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, args) {
    return 'assets/' + value + '.png';
    //return value.toLowerCase();
  }
}
