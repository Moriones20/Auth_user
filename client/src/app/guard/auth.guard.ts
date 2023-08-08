import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (): any => {
  const router = inject(Router);
  const authService = inject(AuthService);
  let isLoggedIn: boolean = false || true;

  authService.isAuthenticated().subscribe({
    next: (resp) => {
      if (resp.status == 200) isLoggedIn = true;
    },
    error: (err) => {
      if (err.status == 401) {
        isLoggedIn = false;
      } else {
        console.error(err.error);
      }
    },
  });

  if (isLoggedIn == true) {
    return true;
  }

  return router.parseUrl('/login');
};
