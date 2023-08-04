import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL: string = 'http://localhost:3001';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, body);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/auth/register`, user);
  }

  getJwtToken(): string {
    return this.cookieService.get('accessToken');
  }
}
