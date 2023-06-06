import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private $http: HttpClient
  ) { }

  private baseUrl = 'http://localhost:3000/api/';

  get(url: string, params?: any): Observable<any> {
    return this.$http.get<any>(`${this.baseUrl}${url}`, { params }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  post(url: string, data: any): Observable<any> {
    return this.$http.post<any>(`${this.baseUrl}${url}`, data).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  put(url: string, data: any, params?: any): Observable<any> {
    return this.$http.put<any>(`${this.baseUrl}${url}`, data, { params }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  patch(url: string, data: any, params?: any): Observable<any> {
    return this.$http.patch<any>(`${this.baseUrl}${url}`, data, { params }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }

  delete(url: string, params?: any): Observable<any> {
    return this.$http.delete(`${this.baseUrl}${url}`, { params }).pipe(
      catchError(this.errorHandler.bind(this))
    );
  }



  private errorHandler(response: any): Observable<{ error: string, message: string }> {
    const error = response.error;
    let message = error.message;
    return throwError(() => new Error(message));
  }
}
