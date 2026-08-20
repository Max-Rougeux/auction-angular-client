import {Component, inject} from '@angular/core';
import {NotificationService} from '../../../core/ui/notification.service';
import {BreadcrumbComponent} from '../../components/breadcrumb/breadcrumb.component';
import {PanelService} from '../../../core/ui/panel.service';
import {NgmMotionDirective, NgmPresenceDirective} from '@scripttype/ng-motion';
import {NotificationComponent} from './notification.component';

@Component({
  selector: 'app-notification-panel',
  imports: [
    BreadcrumbComponent,
    NgmMotionDirective,
    NgmPresenceDirective,
    NotificationComponent,
  ],
  template: `
    <div class="absolute inset-0 pointer-events-none">
      <div class="flex flex-col h-full bg-neutral-950 outline outline-neutral-800"
           ngmMotion
           *ngmPresence="this.panelService.leftPanel() === 'notification'"
           [initial]="{ x: '100%' }"
           [animate]="{ x: 0 }"
           [exit]="{ x: '100%' }"
           [transition]="{ type: 'spring', stiffness: 200, damping: 40, duration: .2 }">
        <app-breadcrumb [items]="[{label: 'notifications'}]"/>
        <div class="p-3 flex flex-col pointer-events-auto">
          @for (notification of notificationService.notifications.visibleItems(); track notification.id) {
            <app-notification
              ngmMotion
              *ngmPresence="notificationService.has(notification.id!)"
              [initial]="{ opacity: 0, y: -20, height: 0, }"
              [animate]="{ opacity: 1, y: 0, height: 75 }"
              [exit]="{ opacity: 0, y: 20, height: 0}"
              [transition]="{ type: 'spring', stiffness: 300, damping: 25 }"
              class="overflow-hidden"
              [notification]="notification"/>
          }
        </div>
      </div>
    </div>
  `,
})
export class NotificationPanelComponent {
  readonly notificationService = inject(NotificationService);
  readonly panelService = inject(PanelService);
}
