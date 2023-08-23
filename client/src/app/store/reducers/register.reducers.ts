import { registerState } from '@core/models/register-state.interface';
import { createReducer, on } from '@ngrx/store';
import {
  loadingRegister,
  registerDone,
  registerFailure,
} from '@store/actions/register.actions';

export const initialState: registerState = {
  error: '',
  loading: false,
  user: {
    _id: '',
    name: '',
    email: '',
    password: '',
    createdAt: undefined,
  },
};

export const registerReducer = createReducer(
  initialState,
  on(loadingRegister, (state, { user }) => {
    return { ...state, user, loading: true };
  }),
  on(registerDone, (state) => {
    return { ...state, loading: false };
  }),
  on(registerFailure, (state, { error }) => {
    return { ...state, error: error, loading: false };
  })
);
