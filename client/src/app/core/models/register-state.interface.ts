import { User } from './user.interface';

export interface registerState {
  error: string;
  loading: boolean;
  user: User;
}
