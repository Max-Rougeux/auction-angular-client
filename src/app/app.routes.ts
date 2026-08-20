import { Routes } from '@angular/router';
import {loginGuard} from './core/guards/login.guard';
import {wipeGuard} from './core/guards/wipe.guard';
import {authGuard} from './core/guards/auth.guard';
import {saleResolver} from './core/resolvers/sale.resolver';
import {meResolver} from './core/resolvers/me.resolver';

export const routes: Routes = [
  { path: 'login', canActivate: [loginGuard, wipeGuard],
    loadComponent: () => import('./features/login/page/login.page')
      .then(m => m.LoginPageComponent) },
  {
    path: '', canActivate: [authGuard], canActivateChild: [wipeGuard], resolve: { profile: meResolver },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home',
        loadComponent: () => import('./features/home/page/home.page')
          .then(m => m.HomePageComponent) },
      { path: 'auction/:slug',
        loadComponent: () => import('./features/auction/page/auction.page')
          .then(m => m.AuctionPageComponent),
        resolve: { sale: saleResolver} },
      { path: '**', loadComponent: () => import("./features/not-found/page/not-found.page")
          .then(m => m.NotFoundPageComponent) }
    ]
  }
];
