import {Route} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';

export const appRoutes: Route[] = [

  // Redirect empty path to '/home'
  {path: '', pathMatch: 'full', redirectTo: 'home'},

  // Landing routes
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/landing/home/home.module').then(m => m.LandingHomeModule)
      },
    ]
  },

];
