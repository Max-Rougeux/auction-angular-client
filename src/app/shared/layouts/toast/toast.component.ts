import { Component, input, output, OnInit} from '@angular/core';
import {BadgeCheck} from '../../icons/badge-check';
import {BadgeInfo} from '../../icons/badge-info';
import {BadgeAlert} from '../../icons/badge-alert';
import {BadgeX} from '../../icons/badge-x';
import {Toast} from '../../../core/types/common';
import {NgmMotionDirective} from '@scripttype/ng-motion';

@Component({
  selector: 'app-toast',
  template: `
    <div class="transition-all duration-400 pointer-events-auto bg-neutral-950 shadow-xl shadow-black">
      <div
        class="bg-neutral-300 w-full flex items-center p-3 text-sm"
        role="alert"
      >
        <div class="flex flex-col gap-1">
          <div class="flex  items-center">
            @switch (toast().type) {
              @case ('success') {
                <app-badge-check [size]="16" [strokeWidth]="3" class="me-1"/>
              }
              @case ('error') {
                <app-badge-x [size]="16" [strokeWidth]="3" class="me-1"/>
              }
              @case ('warning') {
                <app-badge-alert [size]="16" [strokeWidth]="3" class="me-1"/>
              }
              @case ('info') {
                <app-badge-info [size]="16" [strokeWidth]="3" class="me-1"/>
              }
            }
            <h6 class="font-semibold text-box-trim tracking-tight">{{ toast().title }}</h6>
          </div>
          <span class="toast__message text-box-trim opacity-70 text-xs">{{ toast().message }}</span>
        </div>
      </div>
      <div class="relative h-0.5 rounded-pill overflow-hidden">
          <div ngmMotion
               [initial]="{ width: 0 }"
               [animate]="{ width: 500 }"
               [transition]=" { duration: (toast().duration)*2 / 1000 + .5, ease: 'easeOut' }"
               class="h-full bg-chart-hot"></div>
      </div>
    </div>
  `,
  imports: [
    BadgeCheck,
    BadgeInfo,
    BadgeAlert,
    BadgeX,
    NgmMotionDirective,
  ]
})
export class ToastComponent implements OnInit {
  toast = input.required<Toast>();
  dismiss = output<number>();

  ngOnInit() {
    setTimeout(() => {
      this.dismiss.emit(this.toast().id);
    }, this.toast().duration);
  }
}
