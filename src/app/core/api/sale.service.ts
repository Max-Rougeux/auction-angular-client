import {inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs';
import {ApiResponse} from '../models/response.model';
import {WebSocketService} from '../ui/web-socket.service';
import {Sale, SalePriceUpdate} from '../models/sale.model';
import {environment} from '../../../environments/environment';
import {Meta} from '../models/meta.model';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private readonly API_URL = `${environment.API_BASE_URL}/sales`;
  private readonly http = inject(HttpClient);
  private readonly wsService = inject(WebSocketService);

  private readonly _sale = signal<Sale | null>(null);
  sale = this._sale.asReadonly();

  private readonly _sales = signal<Sale[]>([]);
  sales = this._sales.asReadonly();

  private readonly _meta = signal<Meta | null>(null);
  meta = this._meta.asReadonly();

  private readonly _prices = new Map<string, WritableSignal<number>>()

  getSales(page: number = 1, category?: string | null) {
    let params = new HttpParams().set('page', page.toString());

    if (category)
      params = params.set('category', category);

    return this.http.get<ApiResponse<Sale[]>>(this.API_URL, {
      params,
      withCredentials: true,
    }).pipe(
      tap(response => {
        const sales = response.data!;

        sales.forEach(sale => {
          this._prices.set(sale.slug, signal(sale.currentPrice))
        })

        this._sales.set(response.data!);
        this._meta.set(response.meta);

      })
    );
  }

  private updatePrice(update: SalePriceUpdate) {
    this._prices.get(update.slug)?.set(update.currentPrice);
  }

  constructor() {
    this.wsService.register<SalePriceUpdate>('/topic/sales/price',
      update => this.updatePrice(update));
  }

  getPrice(slug: string): Signal<number> {
    return this._prices.get(slug)!.asReadonly();
  }
}
