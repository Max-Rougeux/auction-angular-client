import {Component, computed, inject, input, linkedSignal} from '@angular/core';
import {MeService} from '../../../../core/api/me.service';
import {BidService} from '../../../../core/api/bid.service';
import {BiddingService} from '../../../../core/action/bidding.service';
import {SaleDetails} from '../../../../core/models/sale.model';
import {PriceAnimService} from '../../../../core/ui/price-anim.service';
import {NgmMotionDirective, NgmPresenceDirective} from '@scripttype/ng-motion';
import {AuctionContextComponent} from '../auction-context/auction-context.component';
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';
import {BidStepperComponent} from '../bid-stepper/bid-stepper.component';

@Component({
  selector: 'app-form-panel',
  imports: [
    NgmMotionDirective,
    NgmPresenceDirective,
    AuctionContextComponent,
    LoaderComponent,
    BidStepperComponent
  ],
  templateUrl: './form-panel.component.html',
})
export class FormPanelComponent {
  private readonly biddingService = inject(BiddingService);
  private readonly meService = inject(MeService);
  private readonly bidService = inject(BidService);
  private readonly priceAnim = inject(PriceAnimService);

  sale = input.required<SaleDetails>();
  readonly currentPrice = computed(() => this.priceAnim.getOrCreate(this.sale().slug, this.sale().currentPrice)());
  readonly maxBid = computed(() => this.meService.credit());

  private readonly isTopBid = computed(() => this.bidService.bids()[0]?.bidder.slug === this.meService.userSlug());
  private readonly isOwner = computed(() => this.sale().owner.slug === this.meService.userSlug());
  private readonly insufficientCredit = computed(() => this.currentPrice() > this.meService.credit());

  readonly panelState = computed((): 'loading' | 'top-bidder' | 'owner' | 'insufficient' | 'form' => {
    if (!this.bidService.bidsLoaded()) return 'loading';
    if (this.isTopBid()) return 'top-bidder';
    if (this.isOwner()) return 'owner';
    if (this.insufficientCredit()) return 'insufficient';
    return 'form';
  });

  readonly formState = linkedSignal(() =>
    this.panelState() === 'form'
      ? 'idle' as 'idle' | 'submitting' | 'success' | 'error'
      : 'idle' as const
  );

  onBidSubmit(value: number) {
    if (this.formState() === 'submitting') return;
    this.formState.set('submitting');

    setTimeout(() => {
      this.biddingService.placeBid(this.sale().slug, value).subscribe({
        next: () => this.formState.set('success'),
        error: () => this.formState.set('error'),
      });
    }, 500);
  }
}
