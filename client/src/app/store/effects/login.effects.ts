import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '@modules/auth/services/auth.service';
import { loadingLogin, loginDone } from '@store/actions/login.actions';
import { TokenService } from '@shared/services/token/token.service';
import { Store } from '@ngrx/store';

@Injectable()
export class LoginEffects {
  loadingLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadingLogin),
      exhaustMap((action) => {
        const user = action.user;
        return this.authService.login(user).pipe(
          map((resp) => {
            localStorage.setItem('userData', JSON.stringify(resp.user));
            this.tokenService.setToken(resp.token);
            this.store.dispatch(loadingLogin({ user: resp.user }));
            return loginDone();
          }),
          catchError((err) => {
            console.error(err.error);
            return of({
              type: '[Login] failure login',
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
    private tokenService: TokenService,
    private store: Store
  ) {}
}
