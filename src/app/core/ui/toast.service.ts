import { Injectable, signal } from '@angular/core';
import {Toast, ToastType} from '../types/common';
import {NgmPresence} from '../../shared/utils/ngm-presence';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private idCounter = 0;
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = new NgmPresence<Toast>(this._toasts);

  success(title: string, message: string, duration = 3000) {
    this.add('success', title, message, duration);
  }

  error(title: string, message: string, duration = 3000) {
    this.add('error', title, message, duration);
  }

  info(title: string, message: string, duration = 3000) {
    this.add('info', title, message, duration);
  }

  warning(title: string, message: string, duration = 3000) {
    this.add('warning', title, message, duration);
  }

  dismiss(id: number) {
    if (!this.has(id)) return;
    this.toasts.markExiting(id);

    setTimeout(() => {
      this._toasts.update(toasts => toasts.filter(t => t.id !== id));
    }, this.toasts.exitDuration);
  }

  private add(type: ToastType, title:string, message: string, duration: number) {
    const id = this.idCounter++;
    const current = this._toasts();

    const doAdd = () => {
      this._toasts.update(toasts => [
        { id, type, title, message, duration },
        ...toasts,
      ]);
      setTimeout(() => this.dismiss(id), duration);
    };

    if (current.length >= 3) {
      this.dismiss(current.at(-1)!.id);
      setTimeout(doAdd, this.toasts.exitDuration);
    } else {
      doAdd();
    }
  }

  has(id: number): boolean {
    return this._toasts().some(t => t.id === id);
  }
}
