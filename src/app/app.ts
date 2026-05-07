import {afterNextRender, Component, ElementRef, inject, viewChild} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {environment} from '../environments/environment';
import {WebSocketService} from './core/ui/web-socket.service';
import {SaleService} from './core/api/sale.service';
import {BidService} from './core/api/bid.service';
import {AuthService} from './core/api/auth.service';
import {WipeService} from './core/ui/wipe.service';
import {NgOptimizedImage} from '@angular/common';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly wipeEl = viewChild<ElementRef>('wipe');
  private readonly wipeService = inject(WipeService);
  private readonly wsService = inject(WebSocketService);
  protected readonly router = inject(Router);
  private previousPath = '';

  constructor() {
    inject(SaleService);
    inject(BidService);

    const authService = inject(AuthService);
    afterNextRender(() => {
      this.wipeService.wipeEl = this.wipeEl()?.nativeElement;
      authService.isLoggedIn$()
        ? this.wsService.connect()
        : this.wsService.disconnect();
    });

    this.router.events.pipe(
      takeUntilDestroyed()
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentPath = event.urlAfterRedirects.split('?')[0];

        if (currentPath !== this.previousPath) {
          this.wipeService.animateOut();
          this.previousPath = currentPath;
        }
      }
    });
  }

  protected readonly environment = environment;
}
