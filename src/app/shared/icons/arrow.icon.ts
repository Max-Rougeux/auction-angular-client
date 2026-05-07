import {Component, input} from '@angular/core';

@Component({
  selector: 'app-arrow-icon',
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round"
         class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right">
      <path d="M7 7h10v10"/>
      <path d="M7 17 17 7"/>
    </svg>
  `,
  styles: ``,
})
export class ArrowIcon {
  size = input<number>(24);
  strokeWidth = input<number>(2);
}
