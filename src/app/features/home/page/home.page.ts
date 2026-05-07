import {Component, inject, input} from '@angular/core';
import {SaleService} from '../../../core/api/sale.service';
import {TitleService} from '../../../core/ui/title.service';
import {combineLatest, switchMap} from 'rxjs';
import {toObservable} from '@angular/core/rxjs-interop';
import {environment} from '../../../../environments/environment';
import {PARAGRAPH_CONTENT} from '../../../core/types/constants';
import {BreadcrumbComponent} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {FilterRowComponent} from '../components/filter-row/filter-row.component';
import {ArrowIcon} from '../../../shared/icons/arrow.icon';
import {SaleGridComponent} from '../components/sales-grid/sale-grid.component';
import {PaginationComponent} from '../components/pagination/pagination.component';
import {ParagraphComponent} from '../../../shared/components/paragraph/paragraph.component';
import {LiveBidsBlocComponent} from '../components/livebid-container/live-bids-bloc.component';

@Component({
  selector: 'app-home',
  imports: [
    BreadcrumbComponent,
    FilterRowComponent,
    ArrowIcon,
    SaleGridComponent,
    PaginationComponent,
    ParagraphComponent,
    LiveBidsBlocComponent
  ],
  templateUrl: './home.page.html',
})
export class HomePageComponent {
  private readonly titleService = inject(TitleService);
  private readonly saleService = inject(SaleService);

  page = input<number>(1);
  category = input<string | null>(null);

  constructor() {
    this.titleService.set('Home');

    combineLatest([
      toObservable(this.page),
      toObservable(this.category)
    ]).pipe(
      switchMap(([page, category]) => this.saleService.getSales(page, category))
    ).subscribe();
  }

  readonly environment = environment;
  readonly content = PARAGRAPH_CONTENT;
}
