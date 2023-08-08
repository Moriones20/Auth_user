import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL: string = 'http://localhost:3001';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, body);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/auth/register`, user);
  }

  isAuthenticated(): Observable<any> {
    const accessToken = this.tokenService.getToken();

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );

    return this.http.get(`${this.BASE_URL}/auth/verifyJWT`, {
      headers,
      observe: 'response',
    });
  }

  logout(): void {
    this.tokenService.deleteToken();
    localStorage.removeItem('userData');
  }
}
