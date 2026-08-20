import {Component, input} from '@angular/core';
import {SaleBadgeComponent} from '../sale-badge/sale-badge.component';
import {Sale} from '../../../core/models/sale.model';
import {LikesComponent} from '../likes-layout/likes.component';
import {ImgUrlPipe} from '../../pipes/img-url.pipe';
import {NgOptimizedImage} from '@angular/common';
import {SaleNamePipe} from '../../pipes/sale-name.pipe';

@Component({
  selector: 'app-sale-thumbnail',
  imports: [
    SaleBadgeComponent,
    LikesComponent,
    SaleBadgeComponent,
    ImgUrlPipe,
    NgOptimizedImage,
    SaleNamePipe
  ],
  templateUrl: './sale-thumbnail.component.html',
})
export class SaleThumbnailComponent {
  sale = input.required<Sale>();
  isFeatured = input<boolean>(false);
}
