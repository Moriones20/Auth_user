import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { TokenService } from '@shared/services/token.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

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

      this.authService.login(user).subscribe({
        next: (resp) => {
          localStorage.setItem('userData', JSON.stringify(resp.user));
          this.tokenService.setToken(resp.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }

  loginGoogle() {
    window.location.href = `${this.URL}/auth/google`;
  }

  loginFacebook() {
    window.location.href = `${this.URL}/auth/facebook`;
  }
}
