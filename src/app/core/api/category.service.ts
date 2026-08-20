import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Category} from '../models/category.model';
import {ApiResponse} from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly API_URL = `${environment.API_BASE_URL}/categories`;
  private readonly http = inject(HttpClient);

  private readonly _categories = signal<Category[]>([]);
  categories = this._categories.asReadonly();

  getCategories() {
    return this.http.get<ApiResponse<Category[]>>(`${this.API_URL}?filterByCount=true`, {withCredentials: true}).pipe(
      tap(response => {
        this._categories.set(response.data!);
      })
    );
  }
}
