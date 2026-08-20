import {Component, computed, inject} from '@angular/core';
import {PanelService} from '../../../core/ui/panel.service';
import {SignalIcon} from '../../icons/signal.icon';

@Component({
  selector: 'app-feed-indicator',
  imports: [
    SignalIcon
  ],
  template: `
    <button (click)="this.panelService.setLeftPanel('feed')"
            [class.rounded]="isActive()"
      class="group outline outline-neutral-800 h-full transition-all duration-400 hover:rounded-xl w-9">
      <div
        [class]="isActive() ? 'bg-neutral-900/50 pointer-events-none rounded' : 'cursor-pointer group-hover:bg-neutral-900/90 group-hover:rounded-xl'"
        class="transition-all duration-400 px-1 flex items-center justify-center size-full">
        <div class="relative dark:text-neutral-200 pt-0.5">
          <app-signal-icon [size]="16" [strokeWidth]="1"/>
          <div class="absolute inset-0 flex justify-end">
            <div class="size-1.5 relative rounded-full overflow-hidden bg-neutral-950 translate-x-0.5">
              <div class="absolute inset-0 bg-chart-hot animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </button>
  `
})
export class FeedIndicatorComponent {
  readonly panelService: PanelService = inject(PanelService);

  isActive = computed(() =>
    this.panelService.leftPanel() === 'feed'
  )
}
