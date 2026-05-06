import {Component, input} from '@angular/core';
import {Bid} from '../../../core/models/bid.model';
import {NgOptimizedImage} from '@angular/common';
import {environment} from '../../../../environments/environment';
import {BIDS} from '../../../core/types/constants';

@Component({
  selector: 'app-bids-preview',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './bids-preview.component.html',
})
export class BidsPreviewComponent {
  bids = input<Bid[]>(BIDS);
  protected readonly environment = environment;
}
