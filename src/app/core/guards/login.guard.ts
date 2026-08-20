import { inject } from "@angular/core";
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../action/auth.service';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router)
  const authService = inject(AuthService)

  if(authService.isLoggedIn())
    return router.createUrlTree(['home']);

  return true;
};
