import {ResolveFn} from '@angular/router';
import {SaleDetails} from '../models/sale.model';
import {inject} from '@angular/core';
import {SaleService} from '../api/sale.service';
import {catchError, map, of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

export const saleResolver: ResolveFn<SaleDetails | null> = (route) => {
  const saleService = inject(SaleService);

  return saleService.getSale(route.params['slug']).pipe(
    map(response => response.data!),
    catchError((err: HttpErrorResponse) => {
      return of(null);
    })
  );
};
