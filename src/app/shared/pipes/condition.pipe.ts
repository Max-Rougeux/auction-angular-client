import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'condition', standalone: true })
export class ConditionPipe implements PipeTransform {
  transform(value: string): string {
    return value
      .replace(/-[a-f0-9]{8}$/, '')  // retire le suffixe unique du slug
      .replaceAll(/[-_]/g, ' ')          // remplace - et _ par des espaces
      .trim()
      .toLowerCase()
      .replaceAll(/\b\w/g, c => c.toUpperCase())
  }
}
