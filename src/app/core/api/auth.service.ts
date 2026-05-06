import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TokenService} from '../ui/token.service';
import {User} from '../models/user.model';
import {ApiResponse} from '../models/response.model';
import {catchError, map, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = `${environment.API_BASE_URL}/auth`;
  private readonly http: HttpClient = inject(HttpClient);
  private readonly tokenService: TokenService = inject(TokenService);

  private readonly _user = signal<User | null>(null)
  user$ = this._user.asReadonly();

  isLoggedIn$ = computed(() => {
    return !!this.user$()
  });

  public login(username: string, password: string) {
    return this.http.post<ApiResponse<User>>(`${this.API_URL}/login`,
      {username, password},
      {withCredentials: true}
    ).pipe(
      tap(response => {
        const user = response.data!;
        this._user.set(user);
        this.tokenService.setToken(user.accessToken, user.expireAt)
      }),
      map(response => response.data)
    )
  }

  public refresh() {
    return this.http.post<ApiResponse<User>>(`${this.API_URL}/refresh`, {},
      {withCredentials: true}
    ).pipe(
      tap(response => {
        const user = response.data!;

        this._user.set(user);
        this.tokenService.setToken(user.accessToken, user.expireAt)
      }),
      map(response => response.data!)
    )
  }

  public logout() {
    this._user.set(null);
    this.tokenService.clearToken();

    return this.http.post(`${this.API_URL}/logout`, {}, { withCredentials: true }).pipe(
      catchError(() => of(null))
    );
  }
}
