import {CanActivateFn, Router} from '@angular/router';
import { inject } from "@angular/core";
import {AuthService} from '../api/auth.service';
import {catchError, map, of} from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if (authService.isLoggedIn$()) return true;

  return authService.refresh().pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['login'])))
  );
};
