import {HttpErrorResponse, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, Observable, of, switchMap, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {TokenService} from '../ui/token.service';
import {AuthService} from '../action/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (req.url.includes('/auth/')) return next(req);

  const ready$: Observable<unknown> = tokenService.isExpired()
    ? authService.refresh()
    : of(null);

  return ready$.pipe(
    switchMap(() => next(addToken(req, tokenService.accessToken()))),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refresh().pipe(
          switchMap(() => next(addToken(req, tokenService.accessToken()))),
          catchError(() => {
            authService.logout().subscribe(() => router.navigate(['/login']));
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

function addToken(req: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
  if (!token) return req;
  return req.clone({setHeaders: {Authorization: token}});
}
