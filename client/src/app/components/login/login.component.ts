import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  URL_BACK: string = 'http://localhost:3001';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.login(email, password).subscribe(
        (response) => {
          const token = response.token;
          localStorage.setItem('token', token);
          this.router.navigate(['/home']);
        },
        (err) => {
          alert(err.error.message);
        }
      );
    }
  }

  loginGoogle() {
    window.location.href = `${this.URL_BACK}/auth/google`;
  }

  loginFacebook() {
    window.location.href = `${this.URL_BACK}/auth/facebook`;
  }
}
