import {Component, input} from '@angular/core';
import {ArrowIcon} from '../../icons/arrow.icon';

@Component({
  selector: 'app-bloc-title',
  imports: [
    ArrowIcon
  ],
  templateUrl: './bloc-title.component.html',
})
export class BlocTitleComponent {
  title = input.required<string>();
}
