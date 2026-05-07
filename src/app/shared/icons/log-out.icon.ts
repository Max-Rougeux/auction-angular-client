import {Component, input} from '@angular/core';

@Component({
  selector: 'app-log-out-icon',
  imports: [],
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" fill="none" stroke="currentColor"
         [attr.stroke-width]="strokeWidth()" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
         stroke-linecap="round" stroke-linejoin="round"
         class="lucide lucide-log-out-icon lucide-log-out">
      <path d="m16 17 5-5-5-5"/>
      <path d="M21 12H9"/>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    </svg>
  `,
  styles: ``,
})
export class LogOutIcon {
  size = input<number>(24);
  strokeWidth = input<number>(1.5);
}
