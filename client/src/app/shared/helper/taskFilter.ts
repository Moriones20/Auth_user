import { Task } from '@core/models/task/task.interface';

export const taskFilter = (tasks: Task[]) => {
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;

  if (userData || userData._id) {
    const filteredTasks = tasks.filter((task) => task.user == userData._id);
    return filteredTasks;
  }

  return [];
};
