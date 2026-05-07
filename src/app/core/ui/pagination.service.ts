import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private readonly router = inject(Router);

  navigate(params: { page?: number; category?: string | null }) {
    this.router.navigate([], {
      queryParams: {
        page: params.page ?? 1,
        category: params.category ?? null,
      },
    }).then();
  }
}
