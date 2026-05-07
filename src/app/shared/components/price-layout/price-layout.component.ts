import {Component, effect, input, OnInit, signal} from '@angular/core';
import {animateCounter} from '../../utils/gsap-counter';
import {MoneyIcon} from '../../icons/money.icon';

@Component({
  selector: 'app-price-layout',
  imports: [
    MoneyIcon,
  ],
  templateUrl: './price-layout.component.html',
})
export class PriceLayoutComponent implements OnInit {

  size = input<number>(20);
  value = input.required<number>();
  displayPrice = signal(0);
  dark = input<boolean>(true);

  ngOnInit(): void {
    this.displayPrice.set(this.value());
  }

  constructor() {
    effect(() => {
      animateCounter(this.displayPrice, this.value());
    });
  }
}
