import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  URL_BACK: string = 'http://localhost:3001';

  constructor(private cookieService: CookieService) {}

  setToken(token: string): void {
    this.cookieService.set('accessToken', token);
  }

  getToken(): string {
    return this.cookieService.get('accessToken');
  }
}
