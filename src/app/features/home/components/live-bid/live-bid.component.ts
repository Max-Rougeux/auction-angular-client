import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {environment} from '../../../../../environments/environment';
import {InitialPipe} from '../../../../shared/pipes/initial.pipe';
import {Bid} from '../../../../core/models/bid.model';
import {SlugPipe} from '../../../../shared/pipes/unslug.pipe';
import {TimeAgoPipe} from '../../../../shared/pipes/time-ago.pipe';
import {PriceLayoutComponent} from '../../../../shared/components/price-layout/price-layout.component';

@Component({
  selector: 'app-live-bid',
  imports: [
    NgOptimizedImage,
    PriceLayoutComponent,
    InitialPipe,
    SlugPipe,
    TimeAgoPipe
  ],
  templateUrl: './live-bid.component.html',
})
export class LiveBidComponent {
  data = input.required<Bid>();
  delay = input<number>(0);

  protected readonly environment = environment;
}
