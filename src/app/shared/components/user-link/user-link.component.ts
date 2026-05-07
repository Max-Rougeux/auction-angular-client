import { Component, input } from '@angular/core';
import {UserPreview} from "../../../core/models/user.model";
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-user-link',
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './user-link.component.html',
})
export class UserLinkComponent {
  user = input.required<UserPreview>();
  extended = input<boolean>(false);
  info = input<string | null>(null);
  protected readonly environment = environment;
}
