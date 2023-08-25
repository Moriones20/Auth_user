import { authState } from '@core/models/user/auth-state.interface';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './reducers/auth.reducers';
import { registerState } from '@core/models/user/register-state.interface';
import { registerReducer } from './reducers/register.reducers';
import { taskState } from '@core/models/task/taskState.interface';
import { taskReducer } from './reducers/task.reducers';

export interface AppState {
  auth: authState;
  register: registerState;
  task: taskState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  auth: authReducer,
  register: registerReducer,
  task: taskReducer,
};
