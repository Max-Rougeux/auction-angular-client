import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../../../client-old/src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {ProfileView} from '../models/user.model';
import {ApiResponse} from '../models/response.model';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class MeService {
  private readonly API_URL = `${environment.API_BASE_URL}/me`;
  private readonly http = inject(HttpClient);

  private readonly _profile = signal<ProfileView | null>(null);
  readonly profile = this._profile.asReadonly();

  public getProfile() {
    return this.http.get<ApiResponse<ProfileView>>(this.API_URL, { withCredentials: true }).pipe(
      tap(response => this._profile.set(response.data))
    );
  }
}
