import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs';
import {ApiResponse, Meta, WSPriceUpdate} from '../models/response.model';
import {WebSocketService} from '../ui/web-socket.service';
import {Sale, SaleDetails} from '../models/sale.model';
import {environment} from '../../../environments/environment';
import {PriceAnimService} from '../ui/price-anim.service';
import {NgmPresence} from '../../shared/utils/ngm-presence';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private saleCounter = 0;

  private readonly API_URL = `${environment.API_BASE_URL}/sales`;
  private readonly http = inject(HttpClient);
  private readonly wsService = inject(WebSocketService);
  private readonly priceAnim = inject(PriceAnimService);

  private readonly _sales = signal<Sale[]>([]);
  readonly sales = this._sales.asReadonly();

  private readonly _sale = signal<SaleDetails | null>(null);
  readonly sale = this._sale.asReadonly();

  private readonly _meta = signal<Meta | null>(null);
  readonly meta = this._meta.asReadonly();

  readonly presenceList = computed(() => {
    return new NgmPresence<Sale>(this._sales, signal(this.meta()?.size ?? 0), 300);
  })

  constructor() {
    this.wsService.register<WSPriceUpdate>(
      '/topic/sales/price',
      update => this.priceAnim.animateTo(update.slug, update.price)
    );
  }

  getSales(page: number = 1, category?: string | null) {
    let params = new HttpParams().set('page', page.toString());

    if (category)
      params = params.set('category', category);

    return this.http.get<ApiResponse<Sale[]>>(this.API_URL, {
      params,
      withCredentials: true,
    }).pipe(
      tap(response => {
        this._sales.set(response.data!.map(sale => ({...sale, id: this.saleCounter++})));
        this._meta.set(response.meta);
      })
    );
  }

  getSale(slug: string) {
    return this.http.get<ApiResponse<SaleDetails>>(
      `${this.API_URL}/${slug}`,
      {withCredentials: true}
    ).pipe(
      tap(response => {
        this._sale.set(response.data!);
      })
    );
  }
}
