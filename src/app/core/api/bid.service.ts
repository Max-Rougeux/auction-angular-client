import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { WebSocketService } from '../ui/web-socket.service';
import {environment} from '../../../environments/environment';
import {Bid} from '../models/bid.model';
import {NgmPresence} from '../../shared/utils/ngm-presence';
import {ApiResponse} from '../models/response.model';

const LIVE_BIDS_LIMIT = 3;

@Injectable({
  providedIn: 'root',
})
export class BidService {
  private bidCounter = 0;

  private readonly API_URL = `${environment.API_BASE_URL}/bids`;
  private readonly http = inject(HttpClient);
  private readonly wsService = inject(WebSocketService);

  private readonly _liveBids = signal<Bid[]>([]);
  private readonly _limit = signal<number>(LIVE_BIDS_LIMIT);

  readonly presenceList = new NgmPresence<Bid>(this._liveBids, this._limit, 300);

  constructor() {
    this.wsService.register<Bid>('/topic/liveBids', bid => {
      this.presenceList.add({ ...bid, id: this.bidCounter++ });
    });
  }

  public getLatest() {
    return this.http.get<ApiResponse<Bid[]>>(`${this.API_URL}/latest?limit=${LIVE_BIDS_LIMIT}`, { withCredentials: true }).pipe(
      tap(response => {
        const bids = response.data!.map(bid => ({ ...bid, id: this.bidCounter++ }));
        this._liveBids.set(bids);
      })
    );
  }
}
