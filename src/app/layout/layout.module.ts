import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {SharedModule} from '../shared/shared.module';
import {LandingHomeModule} from '../modules/landing/home/home.module';

const layoutModules = [
  // Landing Home
  LandingHomeModule,
];

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ...layoutModules
  ],
  exports: [
    LayoutComponent,
    ...layoutModules
  ]
})
export class LayoutModule {
}
