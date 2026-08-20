import { Component, inject } from '@angular/core';
import {OauthInputComponent} from '../components/oauth-input/oauth-input.component';
import {LoginFormComponent} from '../components/login-form/login-form.component';
import {TitleService} from '../../../core/ui/title.service';
import {ParagraphComponent} from '../../../shared/components/paragraph/paragraph.component';
import {BrandsComponent} from '../../../shared/components/brands/brands.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    OauthInputComponent,
    LoginFormComponent,
    ParagraphComponent,
    BrandsComponent,
    NgOptimizedImage
  ],
  templateUrl: './login.page.html',
})
export class LoginPageComponent {
  private readonly titleService = inject(TitleService);

  constructor() {
    this.titleService.set('Login')
  }
}
