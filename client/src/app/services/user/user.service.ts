import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  BASE_URL: string = 'http://localhost:3001';

  getAllUsers(): Observable<User[]> {
    const accessToken = this.tokenService.getToken();

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.get<User[]>(`${this.BASE_URL}/users`, { headers });
  }

  getUser(id: string): Observable<User> {
    const accessToken = this.tokenService.getToken();

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.get<User>(`${this.BASE_URL}/users/${id}`, { headers });
  }

  deleteUser(id: string): Observable<User> {
    const accessToken = this.tokenService.getToken();

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.delete<User>(`${this.BASE_URL}/users/${id}`, { headers });
  }

  updateUser(id: string, user: User): Observable<User> {
    const accessToken = this.tokenService.getToken();

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.put<User>(`${this.BASE_URL}/users/${id}`, user, {
      headers,
    });
  }
}
