import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'sale',
    pathMatch: 'full',
  },
  {
    path: 'sale',
    loadComponent: () => import('./sale/sale.page').then( m => m.SalePage)
  },
];
