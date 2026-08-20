import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/response.model';
import { tap } from 'rxjs';
import { animateCreditCounter, CreditDirection } from '../../shared/utils/gsap-credit-counter';
import { environment } from '../../../environments/environment';
import { WebSocketService } from '../ui/web-socket.service';
import { NotificationService } from '../ui/notification.service';
import {UserDetails} from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class MeService {
  private readonly API_URL = `${environment.API_BASE_URL}/me`;
  private readonly http = inject(HttpClient);
  private readonly wsService = inject(WebSocketService);
  private readonly notificationService = inject(NotificationService);

  private readonly _credit = signal<number>(0);
  readonly credit = this._credit.asReadonly();

  private readonly _creditDirection = signal<CreditDirection>(null);
  readonly creditDirection = this._creditDirection.asReadonly();

  private readonly _userSlug = signal<string>(' ');
  readonly userSlug = this._userSlug.asReadonly();

  getProfile() {
    return this.http.get<ApiResponse<UserDetails>>(this.API_URL, { withCredentials: true }).pipe(
      tap(response => {
        this._credit.set(response.data!.credit);
        this._userSlug.set(response.data!.slug);
      })
    );
  }

  updateCredit(amount: number) {
    animateCreditCounter(
      this._credit,
      amount,
      (direction) => this._creditDirection.set(direction)
    );
  }

  constructor() {
    this.wsService.register<{ amount: number; slug: string; outbid: number }>(
      '/user/queue/refund',
      ({ amount, slug, outbid }) => {
        console.log({ amount, slug, outbid })

        this.updateCredit(this.credit() + amount);
        this.notificationService.outBid(slug, outbid);
      }
    );

    this.wsService.register<{ amount: number; }>(
      '/user/queue/debit',
      ({ amount }) => {
        console.log({ amount })

        this.updateCredit(this.credit() - amount);
      }
    );
  }
}
