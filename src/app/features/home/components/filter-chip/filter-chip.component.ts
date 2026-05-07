import { Component, input, output } from '@angular/core';
import { Category } from '../../../../core/models/category.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-filter-chip',
  imports: [NgClass],
  templateUrl: './filter-chip.component.html',
})
export class FilterChipComponent {
  category = input<Category | null>(null);
  isActive = input<boolean>(false);
  count = input<number>(0);

  selectFilter = output<string | null>();

  onClick() {
    this.selectFilter.emit(this.category()?.slug ?? null);
  }
}
