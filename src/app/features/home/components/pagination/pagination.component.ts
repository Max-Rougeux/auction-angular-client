import {Component, computed, inject} from '@angular/core';
import {NgClass} from '@angular/common';
import {NgmMotionDirective} from '@scripttype/ng-motion';
import {BlocTitleComponent} from '../../../../shared/components/bloc-title/bloc-title.component';
import {SaleService} from '../../../../core/api/sale.service';
import {PaginationService} from '../../../../core/ui/pagination.service';
import {SLIDE_UP} from '../../../../shared/utils/motion';

@Component({
  selector: 'app-pagination',
  imports: [
    NgClass,
    NgmMotionDirective,
    BlocTitleComponent,
  ],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  private readonly saleService = inject(SaleService);
  private readonly paginationService = inject(PaginationService);

  meta = this.saleService.meta;

  pages = computed(() => {
    const total = this.meta()?.pages ?? 0;
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  goToPage(page: number) {
    this.paginationService.navigate({page});
  }

  readonly itemVariants= SLIDE_UP;
}
