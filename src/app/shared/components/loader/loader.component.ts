import {Component, input} from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div class="flex-none animate-spin border-2 rounded-full"
         [style.height.px]="size()" [style.width.px]="size()"
         style="border-color: currentColor; border-top-color: transparent;"></div>
  `
})
export class LoaderComponent {
  size = input.required<number>();
}
