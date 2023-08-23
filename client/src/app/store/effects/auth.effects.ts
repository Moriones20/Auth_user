import { Injectable } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  authDone,
  authFailure,
  loadingAuth,
} from '@store/actions/auth.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  loadingAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadingAuth),
      switchMap(() => {
        return this.authService.isAuth().pipe(
          map((resp) => authDone()),
          catchError((err) => {
            console.error(err);
            const errorMessage = err.error?.message || 'An error occurred';
            return of(authFailure({ error: errorMessage })); // Usar 'of' para emitir la acción de error
          })
        );
      })
    );
  });

  constructor(private actions$: Actions, private authService: AuthService) {}
}
