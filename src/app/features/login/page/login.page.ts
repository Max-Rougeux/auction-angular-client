import { Component, inject } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {environment} from '../../../../environments/environment.development';
import {OauthInputComponent} from '../components/oauth-input/oauth-input.component';
import {LoginFormComponent} from '../components/login-form/login-form.component';
import {TitleService} from '../../../core/ui/title.service';

@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    OauthInputComponent,
    LoginFormComponent
  ],
  templateUrl: './login.page.html',
})
export class LoginPageComponent {
  protected readonly environment = environment;
  private readonly titleService = inject(TitleService);

  constructor() {
    this.titleService.set('Login')
  }
}
