import {Component, inject} from '@angular/core';
import {TitleService} from '../../../core/ui/title.service';
import {BreadcrumbComponent} from '../../../shared/components/breadcrumb/breadcrumb.component';
import {SlugPipe} from '../../../shared/pipes/unslug.pipe';
import {ActivatedRoute} from '@angular/router';
import {FooterComponent} from '../../../shared/layouts/footer/footer.component';
import {TopbarComponent} from '../../../shared/layouts/topbar/topbar.component';

@Component({
  selector: 'app-not-found',
  imports: [
    BreadcrumbComponent,
    SlugPipe,
    FooterComponent,
    TopbarComponent,
  ],
  template: `
    <app-topbar/>
    <main class="border-y border-secondary">
      <section class="grid grid-cols-10 gap-3">
        <div class="col-start-3 col-end-9">
          <app-breadcrumb [items]="[{ label: 'shop', route: '/home'}, {label: this.route.snapshot.url[1]?.path! | unslug}]"/>
          <div class="grid grid-cols-10 gap-3 pb-50 pt-30">
              <div class="flex gap-1 col-span-10 text-font-primary">
                <span class="text-7xl/16 tracking-tight text-box-trim uppercase italic">404.</span>
                <h1 class="text-7xl/16 text-white font-medium  tracking-tight text-box-trim uppercase ">Not here. <br>
                  <span class="opacity-60">Not found.</span><span class="opacity-30">tune <br> in.</span></h1>
              </div>
          </div>
        </div>
      </section>
    </main>
    <app-footer/>
  `
})
export class NotFoundPageComponent {
  private readonly titleService = inject(TitleService);
  readonly route = inject(ActivatedRoute);

  constructor() {
    this.titleService.set('404 — Not Found');
  }
}
