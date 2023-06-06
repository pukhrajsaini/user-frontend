import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { User, UserApiResponse } from '../modals/user.modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiEndpoint = 'user';
  constructor(
    private $http: HttpService
  ) { }

  list(page: number, limit: number): Observable<UserApiResponse> {
    let params = new HttpParams();
    params.set('page', page.toString()).set('limit', limit.toString());
    return this.$http.get(this.apiEndpoint, params);
  }

  details(userId: string): Observable<UserApiResponse> {
    return this.$http.get(`${this.apiEndpoint}/${userId}`);
  }

  delete(userId: string): Observable<UserApiResponse> {
    return this.$http.delete(`${this.apiEndpoint}/${userId}`);
  }

  addUser(userData: FormData): Observable<UserApiResponse> {
    return this.$http.post(this.apiEndpoint, userData);
  }

  editUser(userId: string, userData: FormData): Observable<UserApiResponse> {
    return this.$http.patch(`${this.apiEndpoint}/${userId}`, userData);
  }

}
