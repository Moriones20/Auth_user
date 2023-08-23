import { createSelector } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { authState } from '@core/models/auth-state.interface';

export const selectAuth = (state: AppState) => state.auth;

export const selectLoading = createSelector(
  selectAuth,
  (state: authState) => state.loading
);

export const selectIsAuth = createSelector(
  selectAuth,
  (state: authState) => state.isAuth
);

export const selectUser = createSelector(
  selectAuth,
  (state: authState) => state.user
);

export const selectError = createSelector(
  selectAuth,
  (state: authState) => state.error
);
