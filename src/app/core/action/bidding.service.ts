import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ToastService} from '../ui/toast.service';
import {ApiResponse} from '../models/response.model';
import {catchError, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BiddingService {
  private readonly API_URL = `${environment.API_BASE_URL}/bids/place`;
  private readonly http = inject(HttpClient);
  private readonly toastService = inject(ToastService);

  placeBid(slug: string, amount: number) {
    return this.http.post<ApiResponse<void>>(
      this.API_URL, {slug, amount}, { withCredentials: true }
    ).pipe(
      tap({
        next: () => {
          this.toastService.success('Bid placed',"Your bid has been successfully submitted.");
        },
      }),
      catchError((error: HttpErrorResponse) => {
        const message = error.error?.message ?? 'An error occurred.';
        this.toastService.error("Something went wrong", message);
        return throwError(() => error);
      })
    )
  }
}
