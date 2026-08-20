import {Component, inject} from '@angular/core';
import {ToastService} from '../../../core/ui/toast.service';
import {ToastComponent} from './toast.component';
import {NgmMotionDirective, NgmPresenceDirective} from '@scripttype/ng-motion';

@Component({
  selector: 'app-toast-container',
  imports: [
    ToastComponent,
    NgmPresenceDirective,
    NgmMotionDirective,
  ],
  template: `
    <div class="fixed top-0 left-0 size-full grid grid-cols-10 pointer-events-none overflow-hidden">
      <div
        class="col-start-9 col-end-11 flex flex-col-reverse h-full  items-center toast-container p-3 gap-1.5">
        @let presence = toastService.toasts.presence;

        @for (toast of toastService.toasts.visibleItems(); track toast.id) {
          <app-toast ngmMotion
                     [toast]="toast"
                     (dismiss)="toastService.dismiss($event)"
                     *ngmPresence="presence.visibleById()[toast.id!] ?? false"
                     [initial]="{ y: 40, height: 0, opacity: 0 }"
                     [animate]="{ y: 0, height: 60, opacity: 1, originX: 1  }"
                     [exit]="{ scaleX : 0 }"
                     [transition]="{ type: 'spring', stiffness: 200, damping: 25, duration: .8 }"
                     class="w-full shadow-md"
                     [style.z-index]="toast.id"
          />
        }
      </div>
    </div>
  `
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);
}
