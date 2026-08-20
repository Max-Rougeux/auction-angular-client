import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {BrandsComponent} from '../../components/brands/brands.component';
import {ImgUrlPipe} from '../../pipes/img-url.pipe';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, BrandsComponent, ImgUrlPipe],
  templateUrl: './footer.component.html',
})
export class FooterComponent {}
