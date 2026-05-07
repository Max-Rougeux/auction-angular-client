import {Router} from '@angular/router';
import {Component, inject} from '@angular/core';
import {AuthService} from '../../../core/api/auth.service';
import {FilterOffIcon} from '../../icons/filter-off.icon';
import {SearchIcon} from '../../icons/search.icon';
import {NgOptimizedImage} from '@angular/common';
import {environment} from '../../../../environments/environment';
import {PriceLayoutComponent} from '../../components/price-layout/price-layout.component';
import {AddIcon} from '../../icons/add.icon';
import {LogOutIcon} from '../../icons/log-out.icon';
import {SignalIcon} from '../../icons/signal.icon';
import {BellIcon} from '../../icons/bell.icon';
import {EclipseIcon} from '../../icons/eclipse.icon';
import {MeService} from '../../../core/api/me.service';

@Component({
  selector: 'app-topbar',
  imports: [
    FilterOffIcon,
    SearchIcon,
    NgOptimizedImage,
    PriceLayoutComponent,
    AddIcon,
    LogOutIcon,
    SignalIcon,
    BellIcon,
    EclipseIcon
  ],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly meService = inject(MeService);

  profile = this.meService.profile;

  public logout(): void {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']),);
  }

  constructor() {
    this.meService.getProfile().subscribe();
  }

  protected readonly environment = environment;
}
