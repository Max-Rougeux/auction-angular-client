import {Component, input} from '@angular/core';

@Component({
  selector: 'app-badge-x',
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none"
         stroke="currentColor"
         [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round"
         class="lucide lucide-badge-x-icon lucide-badge-x">
      <path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
      <line x1="15" x2="9" y1="9" y2="15"/>
      <line x1="9" x2="15" y1="9" y2="15"/>
    </svg>
  `,
  styles: ``,
})
export class BadgeX {
  size = input<number>(24);
  strokeWidth = input<number>(2);
}
