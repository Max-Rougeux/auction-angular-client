import {Component, effect, input, signal} from '@angular/core';
import {Sale} from '../../../../core/models/sale.model';
import {BlocTitleComponent} from '../../../../shared/components/bloc-title/bloc-title.component';
import {ONE_DAY} from '../../../../core/types/constants';
import {NgmMotionDirective} from '@scripttype/ng-motion';

@Component({
  selector: 'app-tags-container',
  imports: [
    BlocTitleComponent,
    NgmMotionDirective,
  ],
  templateUrl: './tags-container.component.html',
})
export class TagsContainerComponent {
  sale = input.required<Sale>()
  tags = signal<string[]>([])

  constructor() {
    effect(() => {
      const now = Date.now();

      const tag = () => {
        const endAt = new Date(this.sale().endedAt).getTime();
        const startAt = new Date(this.sale().startedAt).getTime();

        const isEnding = (endAt - now) <= ONE_DAY && endAt > now;
        const isHot = this.sale().currentPrice >= this.sale().startingPrice * 10;
        const isNew = (now - startAt) <= ONE_DAY;

        if (isEnding) return 'ending';
        if (isHot) return 'hot';
        if (isNew) return 'new';

        return null;
      }

      const saleTag = tag()

      this.tags.set([
        this.sale().item.brand,
        this.sale().item.model,
        this.sale().item.category.label,
        ...(saleTag ? [`${saleTag} sale`] : [])
      ]);
    })
  }
}
