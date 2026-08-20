import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {WebSocketService} from '../ui/web-socket.service';
import {environment} from '../../../environments/environment';
import {Bid, BidPoint} from '../models/bid.model';
import {NgmPresence} from '../../shared/utils/ngm-presence';
import {ApiResponse, Meta} from '../models/response.model';

const BIDS_LIMIT = 3;

@Injectable({
  providedIn: 'root',
})
export class BidService {
  private bidCounter = 0;

  private readonly API_URL = `${environment.API_BASE_URL}/bids`;
  private readonly http = inject(HttpClient);
  private readonly wsService = inject(WebSocketService);

  private readonly _bids = signal<Bid[]>([]);
  readonly bids = this._bids.asReadonly();

  private readonly _bidPoints = signal<BidPoint[]>([]);
  readonly bidPoints = this._bidPoints.asReadonly();

  private readonly _meta = signal<Meta | null>(null);
  readonly meta = this._meta.asReadonly();

  readonly limit = signal<number>(BIDS_LIMIT);

  readonly bidsLoaded = signal(false);

  readonly presenceList = new NgmPresence<Bid>(this._bids, this.limit, 300);

  private readonly nextId = () => this.bidCounter++;
  private readonly addBid = (bid: Bid) => {
    this._bids.set([ { ...bid, id: this.nextId() }, ...this._bids()]);
    this._bidPoints.set([...this._bidPoints(), { amount: bid.amount, time: bid.time, user: bid.bidder.slug }]);
  };

  getBids(slug?: string) {
    return this.http.get<ApiResponse<Bid[]>>(slug ? `${this.API_URL}/${slug}` : `${this.API_URL}/latest`,
      { withCredentials: true }).pipe(
      tap(response => {
        this._bids.set(response.data!.map(bid => ({...bid, id: this.nextId()})));
        this.bidsLoaded.set(true);

        if(slug) {
          this._meta.set(response.meta);
          this.limit.set(3);
        } else {
          this.limit.set(5);
        }

        slug
          ? this.wsService.register<Bid>(`/topic/live-bids/${slug}`, this.addBid)
          : this.wsService.register<Bid>(`/topic/live-bids`, this.addBid);
      }),
    )
  }

  getBidPoints(slug: string) {
    return this.http.get<ApiResponse<BidPoint[]>>(`${this.API_URL}/${slug}/all`,
      { withCredentials: true }).pipe(
        tap(response => this._bidPoints.set(response.data!))
    );
  }

  unsubscribe(slug?: string) {
    this.wsService.unregister(slug ? `/topic/live-bids/${slug}` : '/topic/live-bids');
    this._bids.set([]);
    this.bidsLoaded.set(false);
  }
}
