import { Component, input } from '@angular/core';
import {RouterLink} from '@angular/router';
import {BreadcrumbItem} from '../../../core/types/common';

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  items = input.required<BreadcrumbItem[]>();
}
