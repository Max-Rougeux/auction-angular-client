import {Component, input} from '@angular/core';

@Component({
  selector: 'app-cog-icon',
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"
         [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round"
         class="lucide lucide-circle-off-icon lucide-circle-off">
      <path d="M14 17H5"/>
      <path d="M19 7h-9"/>
      <circle cx="17" cy="17" r="3"/>
      <circle cx="7" cy="7" r="3"/>
    </svg>
  `,
  styles: ``,
})
export class CogIcon {
  size = input<number>(24);
  strokeWidth = input<number>(1.5);
}
