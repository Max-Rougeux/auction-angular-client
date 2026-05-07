import { Routes } from '@angular/router';
import {loginGuard} from './core/guards/login.guard';
import {wipeGuard} from './core/guards/wipe.guard';
import {LoginPageComponent} from './features/login/page/login.page';
import {authGuard} from './core/guards/auth.guard';
import {HomePageComponent} from './features/home/page/home.page';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [loginGuard, wipeGuard]},
  {
    path: '', canActivate: [authGuard], canActivateChild: [wipeGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
    ]
  }
];
