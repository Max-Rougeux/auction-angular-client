import { Component } from '@angular/core';
import {environment} from '../../../../../../client-old/src/environments/environment';
import {NgOptimizedImage} from '@angular/common';
import {BrandsComponent} from '../../../features/home/components/brands/brands.component';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, BrandsComponent],
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  protected readonly environment = environment;
}
