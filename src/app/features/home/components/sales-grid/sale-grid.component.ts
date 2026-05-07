import {Component, effect, inject, signal} from '@angular/core';
import {NgmMotionDirective} from '@scripttype/ng-motion';
import {SLIDE_UP} from '../../../../shared/utils/motion';
import {SaleService} from '../../../../core/api/sale.service';
import {SaleCardComponent} from '../../../../shared/components/sale-card/sale-card.component';

@Component({
  selector: 'app-sale-grid',
  imports: [
    SaleCardComponent,
    NgmMotionDirective,
  ],
  templateUrl: './sale-grid.component.html',
})
export class SaleGridComponent {
  private readonly saleService = inject(SaleService);

  showGrid = signal(true);
  sales = this.saleService.sales;
  readonly itemVariants = SLIDE_UP;

  constructor() {
    effect(() => {
      this.sales();
      this.showGrid.set(false);
      setTimeout(() => this.showGrid.set(true), 0);
    });
  }
}
