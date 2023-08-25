import { authState } from '@core/models/user/auth-state.interface';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './reducers/auth.reducers';
import { registerState } from '@core/models/user/register-state.interface';
import { registerReducer } from './reducers/register.reducers';

export interface AppState {
  auth: authState;
  register: registerState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  register: registerReducer,
  auth: authReducer,
};
