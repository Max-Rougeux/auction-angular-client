import {Component, computed, input} from '@angular/core';
import {SaleDetails} from '../../../../core/models/sale.model';
import {BlocTitleComponent} from '../../../../shared/components/bloc-title/bloc-title.component';
import {ParagraphComponent} from '../../../../shared/components/paragraph/paragraph.component';
import {NgmMotionDirective} from '@scripttype/ng-motion';
import {ConditionPipe} from '../../../../shared/pipes/condition.pipe';

@Component({
  selector: 'app-specs-container',
  imports: [
    BlocTitleComponent,
    ParagraphComponent,
    NgmMotionDirective,
  ],
  templateUrl: './specs-container.component.html',
})
export class SpecsContainerComponent {
  sale = input.required<SaleDetails>();

  specs = computed(() => {
    return [
      { label: "Year", value: this.sale().item.year.toString()},
      { label: "Type", value: this.sale().item.category.label},
      { label: "Brand", value: this.sale().item.brand},
      { label: "Condition", value: new ConditionPipe().transform(this.sale().item.condition)},
    ]
  });
}
