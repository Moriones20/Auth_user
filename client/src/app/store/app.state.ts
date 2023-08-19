import { User } from '@core/models/user.interface';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  user: User;
}

// export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
// };
