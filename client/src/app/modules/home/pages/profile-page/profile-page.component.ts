import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@shared/services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  loading$: Observable<boolean> = new Observable();
  passwordMatched: boolean = true;
  editForm: FormGroup = new FormGroup({});
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');

    this.editForm = this.formBuilder.group({
      name: [this.userData.name || '', Validators.required],
      password: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: [''],
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && this.passwordMatch()) {
      this.passwordMatched = true;
      const name = this.editForm.value.name;
      const password = this.editForm.value.password;
      const updateUser: any = {};

      if (name !== this.userData.name) {
        updateUser.name = name;
      }

      if (password) {
        updateUser.password = password;
      }

      if (Object.keys(updateUser).length > 0) {
        this.userService.updateUser(updateUser, this.userData._id).subscribe({
          next: (resp) => {
            console.log(resp);
            localStorage.setItem('userData', JSON.stringify(resp));
          },
          error: (e) => {
            console.error(e);
          },
        });
      }
    } else if (!this.passwordMatch()) {
      this.passwordMatched = false;
    }
  }

  passwordMatch(): boolean {
    const password = this.editForm.get('password')?.value;
    const confirmPassword = this.editForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
}
