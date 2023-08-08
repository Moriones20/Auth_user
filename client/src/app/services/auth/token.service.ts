import { Injectable } from '@angular/core';
import { CookieOptions, CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  URL_BACK: string = 'http://localhost:3001';

  constructor(private cookieService: CookieService) {}

  setToken(token: string): void {
    const cookieOptions: Partial<CookieOptions> = {
      expires: 1,
      path: '/',
      secure: true,
    };
    this.cookieService.set('accessToken', token, cookieOptions);
  }

  getToken(): string {
    return this.cookieService.get('accessToken');
  }

  deleteToken(): void {
    this.cookieService.delete('accessToken');
  }
}
