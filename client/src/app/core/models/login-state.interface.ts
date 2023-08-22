import { User } from './user.interface';

export interface loginState {
  error: string;
  loading: boolean;
  isAuth: boolean;
  user: User;
}
