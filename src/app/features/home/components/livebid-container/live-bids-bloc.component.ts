import {Component, inject, input} from '@angular/core';
import {BlocTitleComponent} from '../../../../shared/components/bloc-title/bloc-title.component';
import {NgmMotionDirective, NgmPresenceDirective} from '@scripttype/ng-motion';
import {environment} from '../../../../../environments/environment';
import {LiveBidComponent} from '../live-bid/live-bid.component';
import {LIST_ITEM_PRESENCE, PANEL_CONTAINER} from '../../../../shared/utils/motion';
import {BidService} from '../../../../core/api/bid.service';

@Component({
  selector: 'app-live-bids-bloc',
  imports: [
    BlocTitleComponent,
    LiveBidComponent,
    NgmMotionDirective,
    NgmPresenceDirective,
  ],
  templateUrl: './live-bids-bloc.component.html',
})
export class LiveBidsBlocComponent {
  private readonly bidService = inject(BidService);

  collapsed = input<boolean>(false)

  readonly environment = environment;
  readonly animatedListPresence = this.bidService.presenceList;
  readonly listVariants = LIST_ITEM_PRESENCE(55);
  readonly panelVariant = PANEL_CONTAINER;

  constructor() {
    this.bidService.getLatest().subscribe()
  }
}
