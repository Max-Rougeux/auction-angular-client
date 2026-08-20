import {Component, computed, inject, input, signal} from '@angular/core';
import {Notification} from '../../../core/types/common';
import {SlugPipe} from '../../pipes/unslug.pipe';
import {MoneyIcon} from '../../icons/money.icon';
import {TimeAgoPipe} from '../../pipes/time-ago.pipe';
import {GavelIcon} from '../../icons/gavel.icon';
import {RouterLink} from '@angular/router';
import {NotificationService} from '../../../core/ui/notification.service';

@Component({
  selector: 'app-notification',
  imports: [
    SlugPipe,
    MoneyIcon,
    TimeAgoPipe,
    GavelIcon,
    RouterLink
  ],
  template: `
    <div
      (mouseenter)="read(notification().id!)"
      (mouseleave)="hover.set(false)"
      class="group pointer-events-auto w-full outline-neutral-800 overflow-hidden border-neutral-800 hover:bg-neutral-900/50">
      <div class="p-3 py-2">
        <div class="grid grid-cols-15 items-center">
          <div class="col text-end flex flex-col h-full relative">
            <div class="flex-none size-1.5 rounded-full mt-2.5 absolute inset-ts-0"
                 [class]="notification().read ? 'bg-neutral-800' : 'bg-neutral-100'"
                 [class.animate-pulse]="!notification().read"></div>
          </div>
          <div class="col-span-11 text-neutral-300 transition-all duration-400"
               [class]="opacityClass()">
            <div class="flex items-end gap-1" [class.text-neutral-400]="notification().read">
              <app-gavel-icon [size]="20" [strokeWidth]="2"/>
              <p class="text-xs font-medium text-box-trim mb-0.5 tracking-tighter">
                You've been outbid
              </p>
            </div>
            <div class="transition-colors duration-400 inline-flex items-center gap-1 text-xs flex-wrap opacity-60">
              <small class="text-box-trim">You're no longer leading on
                 <a [routerLink]="['/auction', notification().slug]"
                class="underline">{{ notification().slug! | unslug }}</a>
              </small>
              <div class="flex items-center gap-0.5 mt-0.5">
                <small class="text-box-trim">Top bid is now at {{ notification().amount }}</small>
                <app-money-icon [size]="14"/>
              </div>
            </div>
          </div>
          <div class="col-span-3 text-end flex flex-col h-full mt-4">
            <p class="text-box-trim text-neutral-300 text-xs mb-auto" [class.text-neutral-400]="notification().read">
              <small>{{ notification().time | timeAgo }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class NotificationComponent {
  readonly notificationService = inject(NotificationService);

  notification = input.required<Notification>();
  hover = signal<boolean>(false);

  readonly opacityClass = computed(() => {
    if (this.hover()) return 'opacity-80';
    return this.notification().read ? 'opacity-60' : 'opacity-100';
  });

  read(id: number) {
    this.notificationService.markAsRead(id);
    this.hover.set(true);
  }
}
