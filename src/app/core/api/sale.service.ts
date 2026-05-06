import {inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../../../angular-client.old/src/environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Sale} from "../../../../../angular-client.old/src/app/core/models/sale.model";
import {tap} from 'rxjs';
import {Meta} from '../../../../../angular-client.old/src/app/core/models/meta.model';
import {ApiResponse} from '../models/response.model';

const BASE_URL = `${environment.API_BASE_URL}/sales`;

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private readonly http = inject(HttpClient);

  private readonly _sale = signal<Sale | null>(null);
  sale = this._sale.asReadonly();

  private readonly _sales = signal<Sale[]>([]);
  sales = this._sales.asReadonly();

  private readonly _meta = signal<Meta | null>(null);
  meta = this._meta.asReadonly();

  getSales(page: number = 1, category?: string | null) {
    let params = new HttpParams().set('page', page.toString());

    if (category)
      params = params.set('category', category);

    return this.http.get<ApiResponse<Sale[]>>(BASE_URL, {
      params,
      withCredentials: true,
    }).pipe(
      tap(response => {
        this._sales.set(response.data!);
        this._meta.set(response.meta);
      })
    );
  }
}
