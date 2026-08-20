import {ActivatedRoute, Router} from '@angular/router';
import {Component, computed, inject, Signal} from '@angular/core';
import {AuthService} from '../../../core/action/auth.service';
import {FilterOffIcon} from '../../icons/filter-off.icon';
import {SearchIcon} from '../../icons/search.icon';
import {NgOptimizedImage} from '@angular/common';
import {AddIcon} from '../../icons/add.icon';
import {LogOutIcon} from '../../icons/log-out.icon';
import {EclipseIcon} from '../../icons/eclipse.icon';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {ImgUrlPipe} from '../../pipes/img-url.pipe';
import {MeService} from '../../../core/api/me.service';
import {PanelButtonComponent} from '../../components/panel-button/panel-button.component';
import {NgmMotionDirective} from '@scripttype/ng-motion';
import {PanelService} from '../../../core/ui/panel.service';
import {SignalIcon} from '../../icons/signal.icon';
import {BellIcon} from '../../icons/bell.icon';
import {NotificationService} from '../../../core/ui/notification.service';
import UserCreditComponent from '../credit/user-credit.component';
import {UserDetails} from '../../../core/models/user.model';

@Component({
  selector: 'app-topbar',
  imports: [
    FilterOffIcon,
    SearchIcon,
    NgOptimizedImage,
    AddIcon,
    LogOutIcon,
    EclipseIcon,
    ImgUrlPipe,
    PanelButtonComponent,
    NgmMotionDirective,
    SignalIcon,
    BellIcon,
    UserCreditComponent,
  ],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly meService = inject(MeService);
  private readonly route = inject(ActivatedRoute);
  readonly panelService = inject(PanelService);
  readonly notificationService = inject(NotificationService);

  profile: Signal<UserDetails | null> = toSignal(
    this.route.root.firstChild!.data.pipe(map(data => data['profile'])),
    { requireSync: true }
  );

  readonly isHome = computed(() =>
    this.router.url === '/home'
  );

  credit = this.meService.credit;

  public logout(): void {
    this.authService.logout().subscribe(() => this.router.navigate(['/login']),);
  }
}
