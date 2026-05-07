import {ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/interceptors/auth-interceptor';
import {AuthService} from './core/api/auth.service';
import {catchError, firstValueFrom, of} from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ]),
    ),
    provideAppInitializer(() => {
      const authService = inject(AuthService);

      return firstValueFrom(
        authService.refresh().pipe(
          catchError(() => {
            return of(null);
          })
        )
      )
    }),
  ]
};
