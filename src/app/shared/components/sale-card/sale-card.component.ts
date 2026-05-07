import {
  afterNextRender,
  Component,
  effect,
  inject,
  Injector,
  input,
  signal, untracked,
  WritableSignal
} from '@angular/core';
import {Sale} from '../../../core/models/sale.model';
import {environment} from '../../../../environments/environment.development';
import {SaleThumbnailComponent} from '../sale-thumbnail/sale-thumbnail.component';
import {MoneyIcon} from '../../icons/money.icon';
import {ArrowIcon} from '../../icons/arrow.icon';
import {SaleService} from '../../../core/api/sale.service';
import {animateCounter} from '../../utils/gsap-counter';

@Component({
  selector: 'app-sale-card',
  imports: [
    SaleThumbnailComponent,
    MoneyIcon,
    ArrowIcon,
  ],
  templateUrl: './sale-card.component.html',
})
export class SaleCardComponent {
  private readonly saleService = inject(SaleService);
  private readonly injector = inject(Injector);

  data = input.required<Sale>();
  private readonly _price: WritableSignal<number> = signal(0);
  price = this._price.asReadonly();

  constructor() {
    afterNextRender(() => {
      this._price.set(this.data().currentPrice); // init sans animation

      effect(() => {
        const livePrice = this.saleService.getPrice(this.data().slug)();
        if (livePrice !== this.data().currentPrice) {
          untracked(() => animateCounter(this._price, livePrice));
        }
      }, { injector: this.injector });
    });
  }

  protected readonly environment = environment;
}
