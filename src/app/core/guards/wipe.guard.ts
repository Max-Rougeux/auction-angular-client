import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const wipeGuard: CanActivateFn = async (_route, state) => {
  const router = inject(Router);

  const currentUrl = router.url.split('?')[0];
  const nextUrl = state.url.split('?')[0];

  if (currentUrl === nextUrl) return true;

  return true;
};
