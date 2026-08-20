import {Component, input} from '@angular/core';

@Component({
  selector: 'app-chart-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" [attr.width]="size()" [attr.height]="size()"
         viewBox="0 0 24 24" fill="none" stroke="currentColor"
         [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round"
         class="icon icon-tabler icons-tabler-outline icon-tabler-chart-line">
      <path d="M5 21v-6"/>
      <path d="M12 21V3"/>
      <path d="M19 21V9"/>
    </svg>
  `,
})
export class ChartIcon {
  size = input<number>(24);
  strokeWidth = input<number>(1.5);
  fill = input<boolean>(false);
}
