import {Component, computed, inject, input, Signal} from '@angular/core';
import {NgmMotionDirective} from '@scripttype/ng-motion';
import {SLIDE_LEFT} from '../../../../shared/utils/motion';
import {BlocTitleComponent} from '../../../../shared/components/bloc-title/bloc-title.component';
import {FilterChipComponent} from '../filter-chip/filter-chip.component';
import {CategoryService} from '../../../../core/api/category.service';
import {PaginationService} from '../../../../core/ui/pagination.service';
import {SaleService} from '../../../../core/api/sale.service';
import {Category} from '../../../../core/models/category.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filter-row',
  imports: [
    FilterChipComponent,
    NgmMotionDirective,
    BlocTitleComponent,
  ],
  templateUrl: './filter-row.component.html',
})
export class FilterRowComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly paginationService = inject(PaginationService);
  private readonly saleService = inject(SaleService);

  readonly meta = this.saleService.meta;
  readonly categories = this.categoryService.categories;
  selectedCategory = input<string | null>(null);

  all: Signal<Category> = computed(() => {
    return { slug: null, label: 'All', count: 10 };
  });

  constructor() {
    if (!this.categories().length) {
      this.categoryService.getCategories()
        .pipe(takeUntilDestroyed())
        .subscribe();
    }
  }

  protected onSelect(slug: string | null) {
    this.paginationService.navigate({ category: slug ?? null });
  }

  protected readonly itemVariants = SLIDE_LEFT;
}
