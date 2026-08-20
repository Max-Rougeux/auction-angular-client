import {Injectable, signal} from '@angular/core';
import {Notification} from '../types/common';
import {NgmPresence} from '../../shared/utils/ngm-presence';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private idCounter = 0;

  private readonly _notifications = signal<Notification[]>([]);
  readonly notifications = new NgmPresence<Notification>(this._notifications, signal(6));

  outBid(slug: string, amount: number): void {
    console.log({ type: 'OUTBID', slug: slug, amount: amount })

    this.push({ type: 'OUTBID', slug: slug, amount: amount });
  }

  push(notification: Omit<Notification, 'id' | 'time' | 'read'>) {
    const id = this.idCounter++;
    this._notifications.update(notifications => [
      { id, ...notification, time: new Date(), read: false },
      ...notifications
    ]);
  }

  markAsRead(id: number) {
    this._notifications.update(notifications =>
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  isPresent(id: number): boolean {
    return this._notifications().some(n => n.id === id);
  }

  dismiss(id: number) {
    if (!this.has(id)) return;
    this.notifications.markExiting(id);

    setTimeout(() => {
      this._notifications.update(toasts => toasts.filter(t => t.id !== id));
    }, this.notifications.exitDuration);
  }

  has(id: number): boolean {
    return this._notifications().some(t => t.id === id);
  }
}
