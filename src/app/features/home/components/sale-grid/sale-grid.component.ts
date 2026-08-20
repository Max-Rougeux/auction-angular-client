import {Component, inject} from '@angular/core';
import {NgmMotionDirective, NgmPresenceDirective} from '@scripttype/ng-motion';
import {SLIDE_UP} from '../../../../shared/utils/motion';
import {SaleService} from '../../../../core/api/sale.service';
import {SaleCardComponent} from '../../../../shared/components/sale-card/sale-card.component';

@Component({
  selector: 'app-sale-grid',
  imports: [
    SaleCardComponent,
    NgmMotionDirective,
    NgmPresenceDirective,
  ],
  templateUrl: './sale-grid.component.html',
})
export class SaleGridComponent {
  private readonly saleService = inject(SaleService);
  readonly animatedListPresence = this.saleService.presenceList;

  readonly itemVariants = SLIDE_UP;
}
