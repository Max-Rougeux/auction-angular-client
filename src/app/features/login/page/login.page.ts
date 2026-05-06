import { Component, inject } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {environment} from '../../../../environments/environment.development';
import {OauthInputComponent} from '../components/oauth-input/oauth-input.component';
import {LoginFormComponent} from '../components/login-form/login-form.component';
import {TitleService} from '../../../core/ui/title.service';
import {ParagraphComponent} from '../../../shared/components/paragraph/paragraph.component';

@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    OauthInputComponent,
    LoginFormComponent,
    ParagraphComponent
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
