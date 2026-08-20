import {Component, computed, inject, input, OnDestroy} from '@angular/core';
import {SaleService} from '../../../core/api/sale.service';
import {TitleService} from '../../../core/ui/title.service';
import {combineLatest, switchMap} from 'rxjs';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';
import {PARAGRAPH_CONTENT} from '../../../core/types/constants';
import {BreadcrumbComponent} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {FilterRowComponent} from '../components/filter-row/filter-row.component';
import {ArrowIcon} from '../../../shared/icons/arrow.icon';
import {SaleGridComponent} from '../components/sale-grid/sale-grid.component';
import {PaginationComponent} from '../components/pagination/pagination.component';
import {ParagraphComponent} from '../../../shared/components/paragraph/paragraph.component';
import {FooterComponent} from '../../../shared/layouts/footer/footer.component';
import {TopbarComponent} from '../../../shared/layouts/topbar/topbar.component';
import {NotificationPanelComponent} from '../../../shared/layouts/notification/notification-panel.component';
import {BidService} from '../../../core/api/bid.service';
import {BidsFeedComponent} from '../../../shared/components/bids-feed/bids-feed.component';

@Component({
  selector: 'app-home',
  imports: [
    BreadcrumbComponent,
    FilterRowComponent,
    ArrowIcon,
    SaleGridComponent,
    PaginationComponent,
    ParagraphComponent,
    FooterComponent,
    TopbarComponent,
    NotificationPanelComponent,
    BidsFeedComponent
  ],
  templateUrl: './home.page.html',
})
export class HomePageComponent implements OnDestroy {
  private readonly titleService = inject(TitleService);
  private readonly saleService = inject(SaleService);
  private readonly bidService = inject(BidService);

  page = input<number>(1);
  category = input<string | null>(null);

  total = computed(() => {
    return this.saleService.meta()?.total
  })

  constructor() {
    this.titleService.set('Home');

    combineLatest([
      toObservable(this.page),
      toObservable(this.category)
    ]).pipe(
      switchMap(([page, category]) => this.saleService.getSales(page, category)),
      takeUntilDestroyed()
    ).subscribe();

    this.bidService.getBids().subscribe();
  }

  ngOnDestroy(): void {
    this.bidService.unsubscribe();
  }


  readonly content = PARAGRAPH_CONTENT;
}
