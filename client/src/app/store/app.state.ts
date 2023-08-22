import { loginState } from '@core/models/login-state.interface';
import { ActionReducerMap } from '@ngrx/store';
import { loginReducer } from './reducers/login.reducers';

export interface AppState {
  login: loginState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  login: loginReducer,
};
