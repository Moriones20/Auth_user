import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  BASE_URL: string = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`);
  }

  createUser(user: User) {
    return this.http.post(`${this.BASE_URL}/users`, user);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.BASE_URL}/users/${id}`);
  }

  updateUser(id: string, user: User) {
    return this.http.patch(`${this.BASE_URL}/users/${id}`, user);
  }
}
