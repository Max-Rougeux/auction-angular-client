import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { gsap } from 'gsap';
import { MeService } from '../../../core/api/me.service';
import { CreditDirection } from '../../utils/gsap-credit-counter';
import {PriceDisplayComponent} from '../../components/price-display/price-display.component';

const DIRECTION_COLOR: Record<NonNullable<CreditDirection>, string> = {
  increase: '#96ecc7', // tailwind text-emerald-300
  decrease: '#f88b9d', // tailwind text-chart-hot — swap for your actual CSS var if needed
};
const DEFAULT_COLOR = 'rgb(255 255 255 / 0.9)';
const COLOR_RETURN_DURATION = 0.2;
const COLOR_RETURN_DELAY = 0.2;

@Component({
  selector: 'app-user-credit',
  imports: [
    PriceDisplayComponent
  ],
  template: `
    <div
      class="text-white/90 group outline outline-neutral-800 transition-all duration-400 hover:rounded-xl min-w-9 h-8 overflow-hidden">
      <button #creditEl
        class="cursor-pointer transition-all duration-400 px-1 flex items-center justify-center h-full w-full relative
        group-hover:bg-neutral-900/90 group-hover:rounded-xl'">
      <app-price-display [value]="credit()" class="scale-80 mt-[1px]"/>
      </button>
    </div>
  `,
})
export default class UserCreditComponent {
  private readonly meService = inject(MeService);

  readonly credit = this.meService.credit;
  readonly creditDirection = this.meService.creditDirection;

  private readonly creditEl = viewChild.required<ElementRef<HTMLElement>>('creditEl');

  constructor() {
    effect(() => {
      const direction = this.creditDirection();
      const el = this.creditEl().nativeElement;

      if (direction === null) {
        gsap.to(el, {
          color: DEFAULT_COLOR,
          duration: COLOR_RETURN_DURATION,
          delay: COLOR_RETURN_DELAY,
          ease: 'power2.inOut',
        });
      } else {
        gsap.killTweensOf(el);
        gsap.to(el, {
          color: DIRECTION_COLOR[direction],
          duration: 0.25,
          ease: 'power2.out',
        });
      }
    });
  }
}
