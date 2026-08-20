import {Injectable, signal, WritableSignal} from '@angular/core';
import {animateCounter} from '../../shared/utils/gsap-counter';

@Injectable({ providedIn: 'root' })
export class PriceAnimService {
  private readonly _signals = new Map<string, WritableSignal<number>>();

  getOrCreate(slug: string, initialPrice: number): WritableSignal<number> {
    if (!this._signals.has(slug)) {
      this._signals.set(slug, signal(initialPrice));
    }
    return this._signals.get(slug)!;
  }

  animateTo(slug: string, newPrice: number) {
    const s = this._signals.get(slug);
    if (s) animateCounter(s, newPrice);
  }

  remove(slug: string) {
    this._signals.delete(slug);
  }
}
