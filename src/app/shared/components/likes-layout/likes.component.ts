import {Component, input} from '@angular/core';
import {LikeIcon} from '../../icons/like.icon';

@Component({
  selector: 'app-likes',
  imports: [
    LikeIcon
  ],
  templateUrl: './likes.component.html',
})
export class LikesComponent {
  likes = input.required<number>();
}
