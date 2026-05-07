import {Component, computed, input} from '@angular/core';
import {CountdownComponent} from '../countdown/countdown.component';
import {SaleBadgeComponent} from '../sale-badge/sale-badge.component';
import {environment} from '../../../../environments/environment';
import {Sale} from '../../../core/models/sale.model';
import {LikesComponent} from '../likes-layout/likes.component';
import {NgClass} from '@angular/common';
import {ITEM_IMG_LIST} from '../../../core/types/constants';

@Component({
  selector: 'app-sale-thumbnail',
  imports: [
    CountdownComponent,
    SaleBadgeComponent,
    LikesComponent,
    NgClass,
    SaleBadgeComponent
  ],
  templateUrl: './sale-thumbnail.component.html',
})
export class SaleThumbnailComponent {
  sale = input.required<Sale>();
  isFeatured = input<boolean>(false);

  img = computed(() => this.sale().item.image ?? this.fallbackImg);

  private readonly fallbackImg = ITEM_IMG_LIST[Math.floor(Math.random() * ITEM_IMG_LIST.length)];
  protected readonly environment = environment;
}
