import { createAction, props } from '@ngrx/store';
import { User } from '@core/models/user.interface';

export const login = createAction(
  '[Login Page] Login',
  props<{ user: User }>()
);
