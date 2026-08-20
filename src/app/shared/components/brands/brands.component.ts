import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

const BRANDS = [
  'arturia_white.png',
  'asm_white.png',
  'korg_white.png',
  'moog_white.png',
  'yamaha_white.png',
  'native-instrument_white.png',
  'radikal_white.png',
  'roland_white.png',
];

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  imports: [
    NgOptimizedImage
  ]
})
export class BrandsComponent {
  readonly brands = [...BRANDS, ...BRANDS];
}
