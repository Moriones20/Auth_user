import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  private readonly URL = environment.user_service;
  loginForm: FormGroup = new FormGroup({});
  userData: any;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.loginForm = this.formBuilder.group({
      email: [
        this.userData.email || '',
        [Validators.required, Validators.email],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      const user = { email, password };

      console.log(`${email} and ${password}`);
    }
  }

  loginGoogle() {
    window.location.href = `${this.URL}/auth/google`;
  }

  loginFacebook() {
    window.location.href = `${this.URL}/auth/facebook`;
  }
}
