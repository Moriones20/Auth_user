import { createSelector } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { loginState } from '@core/models/login-state.interface';

export const selectLogin = (state: AppState) => state.login;

export const selectLoading = createSelector(
  selectLogin,
  (state: loginState) => state.loading
);

export const selectIsAuth = createSelector(
  selectLogin,
  (state: loginState) => state.isAuth
);

export const selectUser = createSelector(
  selectLogin,
  (state: loginState) => state.user
);

export const selectError = createSelector(
  selectLogin,
  (state: loginState) => state.error
);
