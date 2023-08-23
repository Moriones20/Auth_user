import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { loadingRegister, registerDone } from '@store/actions/register.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class registerEffects {
  loadingRegister$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadingRegister),
      exhaustMap((action) => {
        const user = action.user;
        return this.authService.register(user).pipe(
          map((resp) => {
            localStorage.setItem('userData', JSON.stringify(resp.user));
            this.store.dispatch(loadingRegister({ user: resp.user }));
            this.router.navigate(['/auth/login']);
            return registerDone();
          }),
          catchError((err) => {
            console.error(err.error);
            return of({
              type: '[Register] failure register',
              error: err.error.message,
            });
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store,
    private router: Router
  ) {}
}
