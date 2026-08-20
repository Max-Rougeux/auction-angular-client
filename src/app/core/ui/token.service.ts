import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly _accessToken = signal<string | null>(null)
  accessToken = this._accessToken.asReadonly();

  private readonly _expireAt = signal<Date | null>(null)
  expireAt = this._expireAt.asReadonly();

  isExpired = computed(() => {
    const expireAt = this.expireAt();
    if (expireAt === null) return false;
    return expireAt.getTime() - 30_000 <= Date.now();
  });

  public setToken(token: string, expire: Date) {
    this._accessToken.set(token);
    this._expireAt.set(new Date(expire));
  }

  public clearToken() {
    this._accessToken.set(null);
    this._expireAt.set(null);
  }
}
