import {Component, input} from '@angular/core';
import {Bid} from '../../../core/models/bid.model';
import {ImgUrlPipe} from '../../pipes/img-url.pipe';
import {InitialPipe} from '../../pipes/initial.pipe';
import {NgOptimizedImage} from '@angular/common';
import {PriceDisplayComponent} from '../price-display/price-display.component';
import {SlugPipe} from '../../pipes/unslug.pipe';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-live-bid',
  imports: [
    ImgUrlPipe,
    InitialPipe,
    NgOptimizedImage,
    PriceDisplayComponent,
    SlugPipe,
    TimeAgoPipe,
    RouterLink
  ],
  template: `
    <div
      class="group w-full transition-all duration-400 h-13.5 outline outline-neutral-800 overflow-hidden hover:rounded-2xl">
      <div class="transition-all duration-400 flex size-full items-center gap-3 px-3  group-hover:bg-neutral-900/80">
        <div class="flex-none size-1.5 rounded-full bg-neutral-100 animate-pulse"
             [style.animation-delay]="delay() + 'ms'"></div>
        <div class="flex-none relative rounded-full size-9 overflow-hidden transition duration-300">
          <img [ngSrc]="'user/' + bid().bidder.thumbnail.filename | imgUrl" fill
               class="object-cover object-center" alt="user img"/>
        </div>
        <div class="flex-none me-auto pt-1 overflow-hidden text-ellipsis max-w-4/7 text-neutral-200">
          <p
            class="text-xs pt-0.5 uppercase tracking-tighter text-box-trim truncate  mb-0.5 group-hover/user-badge:underline">
            {{ bid().bidder.firstname }} {{ bid().bidder.lastname | initial }}
          </p>
          <div class="flex items-center whitespace-nowrap gap-0.5 text-xs text-box-trim opacity-80">
            Bid on <a [routerLink]="['/auction', bid().slug]"
                      class="block truncate transition cursor-pointer duration-300 group-hover:underline capitalize">{{ bid().slug | unslug }}</a>
          </div>
          <p class="text-box-trim text-xs mb-0.5 opacity-60">
            <small>{{ bid().time | timeAgo }}</small>
          </p>
        </div>
        <app-price-display [value]="bid().amount" class="scale-80 text-white/90"/>
      </div>
    </div>`
})
export class LiveBidComponent {
  readonly bid = input.required<Bid>();
  readonly delay = input<number>(0);
}
