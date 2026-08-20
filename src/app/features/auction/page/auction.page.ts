import {
  Component,
  inject, OnDestroy, OnInit,
  Signal,
} from '@angular/core';
import {TopbarComponent} from '../../../shared/layouts/topbar/topbar.component';
import {FooterComponent} from '../../../shared/layouts/footer/footer.component';
import {BreadcrumbComponent} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';
import {SlugPipe} from '../../../shared/pipes/unslug.pipe';
import {SaleDetails} from '../../../core/models/sale.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {NotFoundPageComponent} from '../../not-found/page/not-found.page';
import {BlocTitleComponent} from '../../../shared/components/bloc-title/bloc-title.component';
import {ParagraphComponent} from '../../../shared/components/paragraph/paragraph.component';
import {UserLinkComponent} from '../../../shared/components/user-link/user-link.component';
import {SpecsContainerComponent} from '../components/specs-container/specs-container.component';
import {TagsContainerComponent} from '../components/tags-container/tags-container.component';
import {AuctionPanelComponent} from '../components/auction-panel/auction-panel.component';
import {NotificationPanelComponent} from '../../../shared/layouts/notification/notification-panel.component';
import {NgmMotionDirective} from '@scripttype/ng-motion';
import {AccordionComponent} from '../components/accordion/accordion.component';
import {TitleService} from '../../../core/ui/title.service';
import {SaleNamePipe} from '../../../shared/pipes/sale-name.pipe';
import {BidService} from '../../../core/api/bid.service';
import {MainPanelComponent} from '../components/main-panel/main-panel.component';
import {BidsFeedComponent} from '../../../shared/components/bids-feed/bids-feed.component';

@Component({
  selector: 'app-auction',
  imports: [
    TopbarComponent,
    FooterComponent,
    BreadcrumbComponent,
    NotFoundPageComponent,
    BlocTitleComponent,
    ParagraphComponent,
    UserLinkComponent,
    SpecsContainerComponent,
    TagsContainerComponent,
    AuctionPanelComponent,
    NotificationPanelComponent,
    NgmMotionDirective,
    AccordionComponent,
    MainPanelComponent,
    BidsFeedComponent,
  ],
  templateUrl: './auction.page.html',
})
export class AuctionPageComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly titleService = inject(TitleService);
  private readonly bidService = inject(BidService);

  sale: Signal<SaleDetails | null> = toSignal(
    this.route.data.pipe(map(data => data['sale'])),
    {requireSync: true}
  );

  ngOnInit(): void {
    const sale = this.sale();
    if (!sale) return;

    this.titleService.set(new SlugPipe().transform(new SaleNamePipe().transform(sale)));
    this.bidService.getBids(sale.slug).subscribe();
    this.bidService.getBidPoints(sale.slug).subscribe();
  }

  ngOnDestroy(): void {
    const sale = this.sale();
    if (!sale) return;

    this.bidService.unsubscribe(sale.slug);
  }
}
