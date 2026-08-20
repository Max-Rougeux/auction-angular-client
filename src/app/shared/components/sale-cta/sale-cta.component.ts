import {Component, inject, input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {PriceDisplayComponent} from '../price-display/price-display.component';
import {ArrowIcon} from '../../icons/arrow.icon';

@Component({
  selector: 'app-sale-cta',
  imports: [
    PriceDisplayComponent,
    RouterLink,
    ArrowIcon,
  ],
  templateUrl: './sale-cta.component.html',
})
export class SaleCtaComponent {
  readonly router = inject(Router);

  link = input.required<string>();
  price = input.required<number>();
  isFeatured = input<boolean>(false);
}
