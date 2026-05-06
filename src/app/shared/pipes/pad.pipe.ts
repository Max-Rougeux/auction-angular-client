import { Pipe, PipeTransform } from '@angular/core';

// shared/pipes/pad.pipe.ts
@Pipe({ name: 'pad', standalone: true })
export class PadPipe implements PipeTransform {
  transform(value: number): string {
    return value < 10 ? '0' + value : String(value);
  }
}
