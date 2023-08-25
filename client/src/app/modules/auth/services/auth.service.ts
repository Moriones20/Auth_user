import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '@shared/services/token.service';
import { Observable } from 'rxjs';
import { User } from '@core/models/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly URL = environment.user_service;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.URL}/auth/login`, user);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.URL}/auth/register`, user);
  }

  isAuth(): Observable<any> {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.URL}/auth/verifyJWT`, {
      headers,
      observe: 'response',
    });
  }

  logout(): void {
    this.tokenService.deleteToken();
    localStorage.removeItem('userData');
  }
}
