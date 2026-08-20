import {
  Component,
  input,
} from '@angular/core';
import {Sale} from '../../../core/models/sale.model';
import {SaleThumbnailComponent} from '../sale-thumbnail/sale-thumbnail.component';
import {ArrowIcon} from '../../icons/arrow.icon';
import {RouterLink} from '@angular/router';
import {AnimatedPriceComponent} from '../animated-price/animate-price.component';
import {SaleNamePipe} from '../../pipes/sale-name.pipe';

@Component({
  selector: 'app-sale-card',
  imports: [
    SaleThumbnailComponent,
    ArrowIcon,
    RouterLink,
    AnimatedPriceComponent,
    SaleNamePipe,
  ],
  templateUrl: './sale-card.component.html',
})
export class SaleCardComponent {
  data = input.required<Sale>();
}
