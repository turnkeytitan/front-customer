import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = `${environment.CUSTOMER_API}/customers`;

  constructor(private http: HttpClient) {}

  getCustomer(
    documentType: string,
    documentNumber: string
  ): Observable<Customer> {
    const params = new HttpParams()
      .set('documentType', documentType)
      .set('documentNumber', documentNumber);

    return this.http
      .get<Customer>(this.apiUrl, { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request. Please check the input values.';
          break;
        case 404:
          errorMessage = 'Customer not found.';
          break;
        case 500:
          errorMessage = 'Internal Server Error.';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return throwError(errorMessage);
  }
}
