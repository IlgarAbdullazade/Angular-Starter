import {NgModule} from '@angular/core';
import {FindByKeyPipe} from './find-by-key.pipe';

@NgModule({
  declarations: [
    FindByKeyPipe
  ],
  exports: [
    FindByKeyPipe
  ]
})
export class FindByKeyPipeModule {
}
