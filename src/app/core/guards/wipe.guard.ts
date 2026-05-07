import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {WipeService} from '../ui/wipe.service';

export const wipeGuard: CanActivateFn = async (_route, state) => {
  const wipe = inject(WipeService);
  const router = inject(Router);

  const currentUrl = router.url.split('?')[0];
  const nextUrl = state.url.split('?')[0];

  if (currentUrl === nextUrl) return true;

  await wipe.animateIn();
  return true;
};
