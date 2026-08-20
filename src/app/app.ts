import {afterNextRender, Component, ElementRef, inject, viewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {WipeService} from './core/ui/wipe.service';
import {NgOptimizedImage} from '@angular/common';
import {environment} from '../environments/environment';
import {ToastContainerComponent} from './shared/layouts/toast/toast-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly wipeEl = viewChild<ElementRef>('wipe');
  private readonly wipeService = inject(WipeService);

  constructor() {
    afterNextRender(() => {
      this.wipeService.wipeEl = this.wipeEl()?.nativeElement;
    });
  }

  protected readonly environment = environment;
}
