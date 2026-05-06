import {Component, inject, input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {PriceLayoutComponent} from '../price-layout/price-layout.component';
import {ArrowIcon} from '../../icons/arrow.icon';

@Component({
  selector: 'app-sale-cta',
  imports: [
    PriceLayoutComponent,
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
