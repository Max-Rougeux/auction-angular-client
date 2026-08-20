import {Component, input} from '@angular/core';
import {NgmMotionDirective, NgmPresenceDirective} from '@scripttype/ng-motion';

@Component({
  selector: 'app-panel-button',
  template: `
    <div
      class=" group outline outline-secondary transition-all duration-400 hover:rounded-xl min-w-9 h-8"
      [class.opacity-40]="disabled()"
      [class.pointer-events-none]="disabled()"
      [class.rounded]="isActive()"
    >
      <button
        class="cursor-pointer transition-all duration-400 px-1 flex items-center justify-center h-full w-full relative"
        [class]="isActive() ? 'bg-primary-active rounded' : 'group-hover:bg-primary-hover group-hover:rounded-xl'">
        <div class="absolute inset-0 text-font-primary flex items-center justify-center "
             [class]="adjust() ? 'pt-0.5' : ''">
          <ng-content/>
          <div ngmMotion
               *ngmPresence="showIndicator()"
               [initial]="{ opacity: 0 }"
               [animate]="{ opacity: 1}"
               [exit]="{ opacity: 0 }"
               class="absolute inset-0 flex justify-end p-1.5 px-2">
            <div class="size-1.5 relative rounded-full overflow-hidden bg-primary translate-x-0.5">
              <div class="absolute inset-0 bg-chart-hot animate-pulse"></div>
            </div>
          </div>
        </div>
      </button>
    </div>
  `,
  imports: [
    NgmPresenceDirective,
    NgmMotionDirective
  ]
})
export class PanelButtonComponent {
  disabled = input<boolean>(false);
  isActive = input<boolean>(false);
  adjust = input<boolean>(false);
  showIndicator = input<boolean>(false);
}
