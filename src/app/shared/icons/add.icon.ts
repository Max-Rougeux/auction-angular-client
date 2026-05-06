import {Component, input} from '@angular/core';

@Component({
  selector: 'app-add-icon',
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.fill]="fill()? 'currentColor' : 'none' " stroke="currentColor" [attr.stroke-width]="strokeWidth()" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d='M18 12h-6m0 0H6m6 0V6m0 6v6'/>
    </svg>
  `,
})
export class AddIcon {
  size = input<number>(24);
  strokeWidth = input<number>(1.5);
  fill = input<boolean>(false);
}
