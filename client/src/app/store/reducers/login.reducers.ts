import { loginState } from '@core/models/login-state.interface';
import { createReducer, on } from '@ngrx/store';
import {
  loadingLogin,
  loginDone,
  loginFailure,
} from '@store/actions/login.actions';

export const initialState: loginState = {
  loading: false,
  isAuth: false,
  error: '',
  user: {
    _id: '',
    name: '',
    email: '',
    password: '',
    createdAt: undefined,
  },
};

export const loginReducer = createReducer(
  initialState,
  on(loadingLogin, (state, { user }) => {
    return { ...state, user, loading: true };
  }),
  on(loginDone, (state) => {
    return { ...state, loading: false, isAuth: true };
  }),
  on(loginFailure, (state, { error }) => {
    return { ...state, error, loading: false, isAuth: false };
  })
);
