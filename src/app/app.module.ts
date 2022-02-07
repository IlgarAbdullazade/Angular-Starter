import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, PreloadAllModules, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {appRoutes} from './app.routing';
import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),

    // Core module of your application
    CoreModule,

    // Layout module of your application
    LayoutModule,

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
