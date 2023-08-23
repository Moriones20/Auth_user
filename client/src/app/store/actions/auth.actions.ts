import { createAction, props } from '@ngrx/store';

export const loadingAuth = createAction('[Auth] loading auth');

export const authFailure = createAction(
  '[Auth] failure auth',
  props<{ error: string }>()
);

export const authDone = createAction('[Auth] successful auth');
