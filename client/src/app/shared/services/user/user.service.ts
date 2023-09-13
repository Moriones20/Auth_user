import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@core/models/user/user.interface';
import { UpdateUser } from '@core/models/user/updateUser.interface';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly URL = environment.user_service;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getUsers(): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.URL}/users`, {
      headers,
    });
  }

  getUserById(id: string): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.URL}/users/${id}`, {
      headers,
    });
  }

  updateUser(user: UpdateUser, id: string): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.URL}/users/${id}`, user, {
      headers,
    });
  }

  deleteUser(id: string): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.URL}/users/${id}`, {
      headers,
    });
  }
}
