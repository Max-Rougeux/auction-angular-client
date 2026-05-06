import {inject, Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private readonly titleService = inject(Title);
  private readonly hook: string = 'Auction, Raise the Frequency';

  set(title: string): void {
    this.titleService.setTitle(`${title} / ${this.hook}`);
  }
}
