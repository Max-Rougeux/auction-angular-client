import {Component, input} from '@angular/core';

@Component({
  selector: 'app-ban-icon',
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"
         [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round"
         class="lucide lucide-circle-off-icon lucide-circle-off">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
      <path d="M9 12l6 0"/>
    </svg>
  `,
  styles: ``,
})
export class BanIcon {
  size = input<number>(24);
  strokeWidth = input<number>(1.5);
}
