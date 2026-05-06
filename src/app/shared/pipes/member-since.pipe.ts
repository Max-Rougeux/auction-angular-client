import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memberSince',
})
export class MemberSincePipe implements PipeTransform {
  transform(value: Date | string): string {
    const diff = Date.now() - new Date(value).getTime();
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(months / 12);

    if (months < 1) return 'new member';
    if (months < 12) return `${months} month${months > 1 ? 's' : ''}`;
    return `${years} year${years > 1 ? 's' : ''}`;
  }
}
