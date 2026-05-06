import {Component, input} from '@angular/core';

@Component({
  selector: 'app-signal-icon',
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"
         [attr.width]="size()" [attr.height]="size()" [attr.fill]="fill()? 'currentColor' : 'none' " stroke="currentColor" [attr.stroke-width]="strokeWidth()"
         viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" id="Audio-Lines--Streamline-Lucide">
      <desc>
        Audio Lines Streamline Icon: https://streamlinehq.com
      </desc>
      <path d="M2 10v3" stroke-width="2"></path>
      <path d="M6 6v11" stroke-width="2"></path>
      <path d="M10 3v18" stroke-width="2"></path>
      <path d="M14 8v7" stroke-width="2"></path>
      <path d="M18 5v13" stroke-width="2"></path>
      <path d="M22 10v3" stroke-width="2"></path>
    </svg>
  `,
  styles: ``,
})
export class SignalIcon {
  size = input<number>(24);
  strokeWidth = input<number>(1.5);
  fill = input<boolean>(false);
}
