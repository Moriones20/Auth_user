import { createAction, props } from '@ngrx/store';
import { User } from '@core/models/user/user.interface';

export const loadingLogin = createAction(
  '[Login] loading login',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Login] failure login',
  props<{ error: string }>()
);

export const loginDone = createAction('[Login] successful login');
