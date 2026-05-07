import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'unslug' })
export class SlugPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .replace(/-[a-f0-9]{8}$/, '')
      .replaceAll(/-(?=[^-]*-)/g, ' ');
  }
}
