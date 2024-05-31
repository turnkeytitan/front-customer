import { Routes } from '@angular/router';
import { FindComponent } from './customer/find/find.component';

export const routes: Routes = [
  {
    path: '',
    component: FindComponent,
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./customer/result/result.component').then(
        (m) => m.ResultComponent
      ),
  },
  { path: '**', redirectTo: '/' },
];
