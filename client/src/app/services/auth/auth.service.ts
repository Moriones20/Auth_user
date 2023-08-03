import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL: string = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/login`, user);
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/register`, user);
  }
}
