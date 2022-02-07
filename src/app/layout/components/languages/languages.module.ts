import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {LanguagesComponent} from './languages.component';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  declarations: [
    LanguagesComponent
  ],
  imports: [
    SharedModule,
    NgSelectModule
  ],
  exports: [
    LanguagesComponent
  ]
})
export class LanguagesModule {
}
