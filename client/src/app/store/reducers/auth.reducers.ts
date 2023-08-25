import { authState } from '@core/models/user/auth-state.interface';
import { createReducer, on } from '@ngrx/store';
import {
  loadingLogin,
  loginDone,
  loginFailure,
} from '@store/actions/login.actions';
import {
  authDone,
  authFailure,
  loadingAuth,
} from '@store/actions/auth.actions';
import { logoutDone } from '@store/actions/logout.actions';

export const initialState: authState = {
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

export const authReducer = createReducer(
  initialState,
  on(loadingLogin, (state, { user }) => {
    return { ...state, user, loading: true };
  }),
  on(loginDone, (state) => {
    return { ...state, loading: false, isAuth: true };
  }),
  on(loginFailure, (state, { error }) => {
    return { ...state, error, loading: false, isAuth: false };
  }),

  on(loadingAuth, (state) => {
    return { ...state, loading: true };
  }),
  on(authDone, (state) => {
    return { ...state, loading: false, isAuth: true };
  }),
  on(authFailure, (state, { error }) => {
    return { ...state, error, loading: false, isAuth: false };
  }),

  on(logoutDone, (state) => {
    return { ...state, loading: false, isAuth: false };
  })
);
