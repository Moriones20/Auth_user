export interface Task {
  id?: string;
  title: string;
  description: string;
  done?: boolean;
  user: string;
  createdAt?: any;
  updatedAt?: any;
}
