import {Component, computed, inject, input} from '@angular/core';
import { SaleDetails} from '../../../../core/models/sale.model';
import {BidService} from '../../../../core/api/bid.service';
import {MoneyIcon} from '../../../../shared/icons/money.icon';
import {AnimatedPriceComponent} from '../../../../shared/components/animated-price/animate-price.component';
import {FormPanelComponent} from '../form-panel/form-panel.component';

@Component({
  selector: 'app-auction-panel',
  imports: [
    MoneyIcon,
    AnimatedPriceComponent,
    FormPanelComponent,
  ],
  templateUrl: './auction-panel.component.html'
})
export class AuctionPanelComponent {
  private readonly bidService = inject(BidService);

  sale = input.required<SaleDetails>();

  readonly bidPoints= this.bidService.bidPoints;
  readonly uniqueBidders = computed(() => new Set(this.bidPoints().map(b => b.user)).size);
}
