import { Component, input } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  imports: [],
  templateUrl: './paragraph.component.html',
})
export class ParagraphComponent {
  content = input.required<string>();
}
