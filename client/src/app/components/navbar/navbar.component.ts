import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title: string = 'Auth App';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe({
      next: (resp) => {
        if (resp.status == 200) this.isAuthenticated = true;
      },
      error: (err) => {
        if (err.status == 401) {
          this.isAuthenticated = false;
        } else {
          console.error(err.error);
        }
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.isAuthenticated = false;
    window.location.href = '/';
  }
}
