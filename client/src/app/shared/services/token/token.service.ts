import { Injectable } from '@angular/core';
import { CookieOptions, CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private cookieService: CookieService) {}

  setToken(token: string): void {
    const cookieOption: Partial<CookieOptions> = {
      expires: 1,
      path: '/',
      secure: true,
    };
    this.cookieService.set('accessToken', token, cookieOption);
  }

  getToken(): string {
    return this.cookieService.get('accessToken');
  }

  deleteToken(): void {
    this.cookieService.delete('accessToken');
  }
}
