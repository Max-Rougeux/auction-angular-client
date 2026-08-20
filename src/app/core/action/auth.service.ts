import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../ui/token.service';
import {ApiResponse, LoginResponse} from '../models/response.model';
import {catchError, map, of, tap} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.API_BASE_URL}/auth`;
  private readonly http: HttpClient = inject(HttpClient);
  private readonly tokenService: TokenService = inject(TokenService);
  private readonly router = inject(Router);

  private readonly _auth = signal<LoginResponse | null>(null)
  auth = this._auth.asReadonly();

  isLoggedIn = computed(() => {
    return !!this.auth()
  });

  login(username: string, password: string) {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API_URL}/login`,
      {username, password},
      {withCredentials: true}
    ).pipe(
      tap(response => {
        const auth = response.data!;
        this._auth.set(auth);
        this.tokenService.setToken(auth.accessToken, auth.expiresAt)
      }),
      map(response => response.data)
    )
  }

  refresh() {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.API_URL}/refresh`, {},
      {withCredentials: true}
    ).pipe(
      tap(response => {
        const auth = response.data!;

        this._auth.set(auth);
        this.tokenService.setToken(auth.accessToken, auth.expiresAt)
      }),
      map(response => response.data!)
    )
  }

  logout() {
    return this.http.post(`${this.API_URL}/logout`, {}, { withCredentials: true }
    ).pipe(
      tap(() => {
        this._auth.set(null);
        this.tokenService.clearToken();
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        this._auth.set(null);
        this.tokenService.clearToken();
        this.router.navigate(['/login']);

        return of(null);
      })
    );
  }
}
