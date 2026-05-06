import {Component, input} from '@angular/core';
import {Sale} from '../../../core/models/sale.model';
import {environment} from '../../../../environments/environment.development';
import {SaleThumbnailComponent} from '../sale-thumbnail/sale-thumbnail.component';
import {MoneyIcon} from '../../icons/money.icon';

@Component({
  selector: 'app-sale-card',
  imports: [
    SaleThumbnailComponent,
    MoneyIcon,
  ],
  templateUrl: './sale-card.component.html',
})
export class SaleCardComponent {
  protected readonly environment = environment;

  data = input.required<Sale>();
}
