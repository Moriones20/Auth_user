import { User } from '@core/models/user.interface';
import { createAction, props } from '@ngrx/store';

export const loadingRegister = createAction(
  '[Register] loading register',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Register] failure register',
  props<{ error: string }>()
);

export const registerDone = createAction('[Register] successful register');
