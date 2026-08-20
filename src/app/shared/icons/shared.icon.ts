import {Component, input} from '@angular/core';

@Component({
  selector: 'app-shared-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size()" [attr.height]="size()"
         viewBox="0 0 24 24" fill="none" stroke="currentColor"
         [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round"
         class="icon icon-tabler icons-tabler-outline icon-tabler-chart-line">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
      <path d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
      <path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
      <path d="M8.7 10.7l6.6 -3.4"/>
      <path d="M8.7 13.3l6.6 3.4"/>
    </svg>
  `,
})
export class SharedIcon {
  size = input<number>(24);
  strokeWidth = input<number>(1.5);
  fill = input<boolean>(false);
}
