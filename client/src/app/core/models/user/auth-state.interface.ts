import { User } from './user.interface';

export interface authState {
  error: string;
  loading: boolean;
  isAuth: boolean;
  user: User;
}
