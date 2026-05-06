import {Component, input} from '@angular/core';

@Component({
  selector: 'app-search-icon',
  imports: [],
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth()" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d='M19 11.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m-2.107 5.42 3.08 3.08'/>
    </svg>
  `,
  styles: ``,
})
export class SearchIcon {
  size = input<number>(24);
  strokeWidth = input<number>(1.5);
}
