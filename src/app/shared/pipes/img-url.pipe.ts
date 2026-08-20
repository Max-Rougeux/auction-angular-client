import {Pipe, PipeTransform} from '@angular/core';
import {environment} from '../../../environments/environment';

@Pipe({ name: 'imgUrl' })
export class ImgUrlPipe implements PipeTransform {
  transform(filename: string | null | undefined): string {
    if (!filename) return '';
    return `${environment.IMG_BASE_URL}/${filename}`;
  }
}
