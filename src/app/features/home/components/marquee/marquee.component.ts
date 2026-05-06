import { Component, input } from '@angular/core';

@Component({
  selector: 'app-marquee',
  imports: [],
  templateUrl: './marquee.component.html',
})
export class MarqueeComponent {
  content = input.required<string>();
}
