import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/listings',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then(m => m.Register)
  },
  {
    path: 'listings',
    loadComponent: () => import('./components/listings/listings').then(m => m.Listings)
  },
  {
    path: 'listing/:id',
    loadComponent: () => import('./components/listing-detail/listing-detail').then(m => m.ListingDetail)
  },
  {
    path: 'bookings',
    loadComponent: () => import('./components/bookings/bookings').then(m => m.Bookings),
    canActivate: [authGuard]
  }
];
