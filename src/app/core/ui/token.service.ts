import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly _accessToken$ = signal<string | null>(null)
  accessToken$ = this._accessToken$.asReadonly();

  private readonly _expireAt$ = signal<number | null>(null)
  expireAt$ = this._expireAt$.asReadonly();

  isExpired$ = computed(() => {
    const expireAt = this.expireAt$();
    if (expireAt === null) return false;
    return expireAt - 30_000 <= Date.now();
  });

  public setToken(token: string, expire: number) {
    this._accessToken$.set(token);
    this._expireAt$.set(expire);
  }

  public clearToken() {
    this._accessToken$.set(null);
    this._expireAt$.set(null);
  }
}
