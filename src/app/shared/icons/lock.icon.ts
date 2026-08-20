import {Component, input} from '@angular/core';

@Component({
  selector: 'app-lock-icon',
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"
         [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round"
         class="lucide lucide-circle-off-icon lucide-circle-off">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  `,
  styles: ``,
})
export class LockIcon {
  size = input<number>(24);
  strokeWidth = input<number>(1.5);
}
