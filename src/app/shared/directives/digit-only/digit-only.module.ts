import {NgModule} from '@angular/core';
import {DigitOnlyDirective} from './digit-only.directive';

@NgModule({
  declarations: [
    DigitOnlyDirective,
  ],
  exports: [
    DigitOnlyDirective,
  ],
})
export class DigitOnlyModule {
}
