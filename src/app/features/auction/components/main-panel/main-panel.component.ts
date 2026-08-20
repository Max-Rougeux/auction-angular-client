import {Component, inject, input} from '@angular/core';
import {ToastService} from '../../../../core/ui/toast.service';
import {PanelService} from '../../../../core/ui/panel.service';
import {SaleDetails} from '../../../../core/models/sale.model';
import {BidChartComponent} from '../bid-chart/bid-chart.component';
import {BreadcrumbComponent} from '../../../../shared/components/breadcrumb/breadcrumb.component';
import {ChartIcon} from '../../../../shared/icons/chart.icon';
import {CogIcon} from '../../../../shared/icons/cog.icon';
import {CountdownComponent} from '../countdown/countdown.component';
import {ImgUrlPipe} from '../../../../shared/pipes/img-url.pipe';
import {LikesComponent} from '../../../../shared/components/likes-layout/likes.component';
import {NgOptimizedImage} from '@angular/common';
import {NgmMotionDirective, NgmPresenceDirective} from '@scripttype/ng-motion';
import {PanelButtonComponent} from '../../../../shared/components/panel-button/panel-button.component';
import {SaleBadgeComponent} from '../../../../shared/components/sale-badge/sale-badge.component';
import {SaleNamePipe} from '../../../../shared/pipes/sale-name.pipe';
import {SharedIcon} from '../../../../shared/icons/shared.icon';
import {SlugPipe} from '../../../../shared/pipes/unslug.pipe';

@Component({
  selector: 'app-main-panel',
  imports: [
    BidChartComponent,
    BreadcrumbComponent,
    ChartIcon,
    CogIcon,
    CountdownComponent,
    ImgUrlPipe,
    LikesComponent,
    NgOptimizedImage,
    NgmMotionDirective,
    NgmPresenceDirective,
    PanelButtonComponent,
    SaleBadgeComponent,
    SaleNamePipe,
    SharedIcon,
    SlugPipe
  ],
  template: `
    <app-breadcrumb [items]="[{ label: 'shop', route: '/home'}, {label: sale().slug | unslug}]"/>
    <div class="p-1.5 grid grid-cols-5 items-end border-b border-neutral-800">
      <div class="col-span-3 p-1.5">
        <h3 class="text-5xl text-box-trim uppercase tracking-tighter text-neutral-200 text-left">
          {{ sale() | saleName }}
        </h3>
      </div>
      <div class="col-span-2 flex justify-end gap-1.5">
        <app-panel-button ngmMotion
                          [whileTap]="{ scale: .9 }"
                          (click)="panelService.toggleMiddlePanel()"
                          [isActive]="panelService.middlePanel() === 'graph'"
                          [showIndicator]="panelService.middlePanel() === 'graph'"
        >
          <app-chart-icon [size]="18" [strokeWidth]="2"/>
        </app-panel-button>
        <app-panel-button ngmMotion
                          [whileTap]="{ scale: .9 }"
                          (click)="share()"
                          [adjust]="true">
          <app-shared-icon [size]="17" [strokeWidth]="2"/>
        </app-panel-button>
        <app-panel-button [disabled]="true">
          <app-cog-icon [size]="18" [strokeWidth]="2"/>
        </app-panel-button>
      </div>
    </div>
    <div class="relative h-full overflow-hidden min-h-125">
      <div class="absolute h-fit inset-0 p-1.5 pe-1 flex justify-between items-center text-white">
        <div
          class="group outline outline-neutral-800 h-8 transition-all duration-400 hover:rounded-xl">
          <div
            class="cursor-pointer transition-all duration-400 px-2 flex items-center justify-center size-full group-hover:bg-neutral-900/90 group-hover:rounded-xl pt-0.5">
            <app-likes [likes]="sale().likes" class="scale-90"/>
          </div>
        </div>
        <app-countdown [endAt]="sale().endedAt"/>
      </div>
      <div ngmMotion *ngmPresence="panelService.middlePanel() === 'thumbnail'"
           [initial]="{ x: '-100%' , opacity: 0 }"
           [animate]="{ x: 0 , opacity: 1 }"
           [exit]="{ x: '-100%', opacity: 0  }"
           [transition]="{ type: 'tween', duration: 0.8, ease: [0.32, 0.72, 0, 1] }"
           class="absolute size-full grid grid-cols-6">
        <div class="flex flex-col col-start-2 col-end-6 p-20 m-auto">
          <div class="relative transition-all ease-in-out duration-400">
            <img [ngSrc]="'item/' + sale().item.thumbnail.filename | imgUrl"
                 [width]="sale().item.thumbnail.width"
                 [height]="sale().item.thumbnail.height"
                 [alt]="(sale() | saleName) + ' thumbnail'"
                 class="transition-all shadow-2xl shadow-black ease-in-out duration-400 opacity-70"
                 loading="lazy"/>
            <app-sale-badge [sale]="sale()" [isGem]="sale().item.isGem" [size]="'xl'" [alwaysAnimate]="true"/>
          </div>
        </div>
      </div>
      <div ngmMotion
           *ngmPresence="panelService.middlePanel() === 'graph'"
           [initial]="{ x: '100%', opacity: 0 }"
           [animate]="{ x: 0, opacity: 1 }"
           [exit]="{ x: '100%', opacity: 0 }"
           [transition]="{ type: 'tween', duration: 0.8, ease: [0.32, 0.72, 0, 1] }"
           class="absolute inset-0 flex flex-col">
        <app-bid-chart class="mt-auto"/>
      </div>
    </div>
  `,
})
export class MainPanelComponent {
  protected readonly toastService = inject(ToastService);
  readonly panelService = inject(PanelService);

  sale = input.required<SaleDetails>();

  share() {
    navigator.clipboard.writeText(globalThis.location.href).then(() =>
      this.toastService.info('Link copied',"The sale link has been copied to your clipboard.")
    );
  }
}
