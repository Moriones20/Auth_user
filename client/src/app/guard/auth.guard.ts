import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (): any => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLogged) {
    return true;
  }

  return router.parseUrl('/login');
};
