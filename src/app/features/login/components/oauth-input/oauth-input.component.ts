import {Component, computed, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-oauth-input',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './oauth-input.component.html',
})
export class OauthInputComponent {
  readonly provider = input.required<'google' | 'github'>();
  readonly label  = computed(() => this.provider() === 'google' ? 'Google' : 'GitHub');
}
