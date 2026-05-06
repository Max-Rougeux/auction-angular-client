import {Component, input} from '@angular/core';

@Component({
  selector: 'app-eclipse-icon',
  imports: [],
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" [attr.fill]="fill()? 'currentColor' : 'none' " stroke="currentColor" [attr.stroke-width]="strokeWidth()" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d='M10.183 3.183A9 9 0 0 0 3 12a9 9 0 0 0 17.817 1.817M10.183 3.183a9 9 0 0 1 10.633 10.633M10.184 3.184c-1.268 6.188 4.533 11.884 10.634 10.634'/>
    </svg>
  `,
  styles: ``,
})
export class EclipseIcon {
  size = input<number>(24);
  strokeWidth = input<number>(1.5);
  fill = input<boolean>(false);
}
