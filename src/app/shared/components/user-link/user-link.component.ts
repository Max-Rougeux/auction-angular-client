import { Component, input } from '@angular/core';
import {UserDetails} from "../../../core/models/user.model";
import {RouterLink} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {ImgUrlPipe} from '../../pipes/img-url.pipe';

@Component({
  selector: 'app-user-link',
  imports: [
    RouterLink,
    NgOptimizedImage,
    ImgUrlPipe
  ],
  templateUrl: './user-link.component.html',
})
export class UserLinkComponent {
  user = input.required<UserDetails>();
  extended = input<boolean>(false);
  info = input<string | null>(null);
}
