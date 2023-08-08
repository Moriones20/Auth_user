import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  URL_BACK: string = 'http://localhost:3001';
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.getItem('isLoggedIn') === 'true' &&
      this.router.navigate(['/home']);

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

      this.authService.login(email, password).subscribe({
        next: (resp) => {
          localStorage.setItem('userData', JSON.stringify(resp.user));
          this.tokenService.setToken(resp.token);
          window.location.href = '/home';
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
    }
  }

  loginGoogle() {
    window.location.href = `${this.URL_BACK}/auth/google`;
  }

  loginFacebook() {
    window.location.href = `${this.URL_BACK}/auth/facebook`;
  }
}
