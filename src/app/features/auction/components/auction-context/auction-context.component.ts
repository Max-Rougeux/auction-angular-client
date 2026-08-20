import {Component, inject, input} from '@angular/core';
import {MeService} from '../../../../core/api/me.service';
import { Sale } from "../../../../core/models/sale.model";
import {PriceDisplayComponent} from '../../../../shared/components/price-display/price-display.component';
import {BidService} from '../../../../core/api/bid.service';
import {LockIcon} from '../../../../shared/icons/lock.icon';
import {ArrowIcon} from '../../../../shared/icons/arrow.icon';

@Component({
  selector: 'app-auction-context',
  imports: [
    PriceDisplayComponent,
    LockIcon,
    ArrowIcon
  ],
  templateUrl: './auction-context.component.html'
})
export class AuctionContextComponent {
  readonly meService = inject(MeService);
  readonly bidService = inject(BidService);

  state = input.required<string>();
  sale = input<Sale>();

  stateIndicator(){
    switch (this.state()) {
      case "top-bidder": return "bg-emerald-400";
      case "insufficient": return "bg-chart-primary";
      default: return "bg-chart-primary";
    }
  }
}
