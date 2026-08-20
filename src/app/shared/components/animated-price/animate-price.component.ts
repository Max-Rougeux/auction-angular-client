import {MoneyIcon} from '../../icons/money.icon';
import {Sale} from '../../../core/models/sale.model';
import {
  Component,
  inject,
  input, OnDestroy, OnInit,
  WritableSignal
} from '@angular/core';
import {PriceAnimService} from '../../../core/ui/price-anim.service';

@Component({
  selector: 'app-animated-price',
  imports: [MoneyIcon],
  template: `
    <div class="flex items-end gap-1">
      <span class="text-6xl tracking-tighter font-light text-box-trim">
        {{ displayPrice() }}
      </span>
      <app-money-icon [size]="18"/>
    </div>
  `
})
export class AnimatedPriceComponent implements OnInit, OnDestroy {
  sale = input.required<Sale>();

  private readonly priceAnim = inject(PriceAnimService);

  protected displayPrice!: WritableSignal<number>;

  ngOnInit() {
    this.displayPrice = this.priceAnim.getOrCreate(
      this.sale().slug,
      this.sale().currentPrice
    );
  }

  ngOnDestroy() {
    this.priceAnim.remove(this.sale().slug);
  }
}
