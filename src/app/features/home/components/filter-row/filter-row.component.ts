import {Component, inject} from '@angular/core';
import {NgmMotionDirective} from '@scripttype/ng-motion';
import {SLIDE_LEFT} from '../../../../shared/utils/motion';
import {BlocTitleComponent} from '../../../../shared/components/bloc-title/bloc-title.component';
import {FilterChipComponent} from '../filter-chip/filter-chip.component';
import {CategoryService} from '../../../../core/api/category.service';
import {PaginationService} from '../../../../core/ui/pagination.service';

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

  readonly categories = this.categoryService.categories;
  readonly selectedCategory = this.categoryService.selectedCategory;

  constructor() {
    this.categoryService.getCategories().subscribe();
  }

  protected onSelect(slug: string | null) {
    this.paginationService.navigate({ category: slug ?? undefined });
  }

  protected readonly itemVariants = SLIDE_LEFT;
}
