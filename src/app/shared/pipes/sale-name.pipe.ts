import {Pipe, PipeTransform} from '@angular/core';
import {Sale} from '../../core/models/sale.model';

@Pipe({name: 'saleName', standalone: true})
export class SaleNamePipe implements PipeTransform {
  transform(sale: Sale): string {
    return `${sale.item.brand} ${sale.item.model}`;
  }
}
