import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { TokenService } from '../auth/token.service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  BASE_URL: string = 'http://localhost:3001';
  token: string = this.tokenService.getToken();

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.BASE_URL}/users/${id}`);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.BASE_URL}/users/${id}`, user);
  }
}
