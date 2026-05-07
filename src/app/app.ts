import {Component, effect, inject} from '@angular/core';
import { Router, RouterOutlet} from '@angular/router';
import {environment} from '../environments/environment';
import {WebSocketService} from './core/ui/web-socket.service';
import {SaleService} from './core/api/sale.service';
import {BidService} from './core/api/bid.service';
import {AuthService} from './core/api/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly wsService = inject(WebSocketService);
  protected readonly router = inject(Router);

  constructor() {
    inject(SaleService);
    inject(BidService);

    const authService = inject(AuthService);

    effect(() => {
      authService.isLoggedIn$()
        ? this.wsService.connect()
        : this.wsService.disconnect();
    });
  }

  protected readonly environment = environment;
}
