import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '@core/models/task/task.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly URL = environment.task_service;

  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<any> {
    return this.http.post<any>(`${this.URL}/api/v1/task`, task);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.URL}/api/v1/task`);
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.URL}/api/v1/task/${id}`);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put<any>(`${this.URL}/api/v1/task`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL}/api/v1/task/${id}`);
  }
}
