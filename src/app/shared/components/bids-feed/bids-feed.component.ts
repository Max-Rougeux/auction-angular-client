import {Component, inject} from '@angular/core';
import {BidService} from '../../../core/api/bid.service';
import {LIST_ITEM_PRESENCE, PANEL_CONTAINER} from '../../utils/motion';
import {BlocTitleComponent} from '../bloc-title/bloc-title.component';
import {NgmMotionDirective, NgmPresenceDirective} from '@scripttype/ng-motion';
import {LiveBidComponent} from '../live-bid/live-bid.component';

@Component({
  selector: 'app-bids-feed',
  imports: [
    BlocTitleComponent,
    LiveBidComponent,
    NgmMotionDirective,
    NgmPresenceDirective,
    LiveBidComponent
  ],
  template: `
    <div class="relative overflow-hidden">
      <div class="p-3">
        <app-bloc-title title="live bids"/>
      </div>
      <div ngmMotion
           [variants]="panelVariant"
           class="flex flex-col gap-1.5 px-3 pb-2">
        @let presence = presenceList.presence;

        @for (bid of presenceList.visibleItems(); track bid.id) {
          <app-live-bid ngmMotion
                        [bid]="bid"
                        [delay]="$index * 400"
                        *ngmPresence="presence.visibleById()[bid.id!] ?? false"
                        [variants]="listVariants"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        [transition]="{ type: 'spring', stiffness: 200, damping: 25, duration: .8 }"/>
        }
      </div>
    </div>
  `
})
export class BidsFeedComponent {
  private readonly service: BidService = inject(BidService);

  readonly presenceList = this.service.presenceList;
  readonly listVariants = LIST_ITEM_PRESENCE(55);
  readonly panelVariant = PANEL_CONTAINER;
}
