import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {catchError, map, of} from 'rxjs';
import {MeService} from '../api/me.service';
import {UserDetails} from '../models/user.model';

export const meResolver: ResolveFn<UserDetails | null> = () => {
  const meService = inject(MeService);

  return meService.getProfile().pipe(
    map(response => response.data!),
    catchError(() => {
      return of(null);
    })
  );
};
