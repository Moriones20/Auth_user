import { registerState } from '@core/models/user/register-state.interface';
import { createSelector } from '@ngrx/store';
import { AppState } from '@store/app.state';

export const selectRegister = (state: AppState) => state.register;

export const selectLoading = createSelector(
  selectRegister,
  (state: registerState) => state.loading
);

export const selectUser = createSelector(
  selectRegister,
  (state: registerState) => state.user
);

export const selectError = createSelector(
  selectRegister,
  (state: registerState) => state.error
);
