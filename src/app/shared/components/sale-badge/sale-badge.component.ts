import {Component, computed, input} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Sale} from '../../../core/models/sale.model';
import {NgClass, NgOptimizedImage} from '@angular/common';
import {ONE_DAY, SIZE_CLASSES} from '../../../core/types/constants';

@Component({
  selector: 'app-sale-badge',
  imports: [
    NgOptimizedImage,
    NgClass
  ],
  templateUrl: './sale-badge.component.html',
})
export class SaleBadgeComponent {
  IMG_URL = `${environment.IMG_BASE_URL}/icon/`;

  sale = input<Sale | null>(null);
  alwaysAnimate = input<boolean>(false);
  isGem = input<boolean>(false);
  badge = computed(() => {
    const now = Date.now();

    if (this.isGem()) return 'gem';

    const sale = this.sale();
    if (sale) {
      const endAt = new Date(sale.endedAt).getTime();
      const startAt = new Date(sale.startedAt).getTime();

      const isEnding = (endAt - now) <= ONE_DAY && endAt > now;
      const isHot = sale.currentPrice >= sale.startingPrice * 10;
      const isNew = (now - startAt) <= ONE_DAY;

      if (isEnding) return 'end';
      if (isHot) return 'hot';
      if (isNew) return 'new';
    }

    return null;
  });

  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');
  sizeClass = computed(() => SIZE_CLASSES[this.size()]);
}
