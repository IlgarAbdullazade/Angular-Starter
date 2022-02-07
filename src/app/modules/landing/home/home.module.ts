import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LandingHomeComponent} from './home.component';
import {landingHomeRoutes} from './home.routing';
import {SharedModule} from '../../../shared/shared.module';
import {LanguagesModule} from '../../../layout/components/languages/languages.module';
import {TranslocoModule} from '@ngneat/transloco';

@NgModule({
  declarations: [
    LandingHomeComponent
  ],
  imports: [
    RouterModule.forChild(landingHomeRoutes),
    SharedModule,
    LanguagesModule,
    TranslocoModule
  ]
})
export class LandingHomeModule {
}
