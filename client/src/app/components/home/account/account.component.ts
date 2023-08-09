import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  isModalOpen: boolean = false;
  id: string | any;
  userString: any;
  user: User | undefined;
  updateForm: FormGroup = new FormGroup({});
  isProfileUpdated: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData') || '{}');

    this.updateForm = this.formBuilder.group({
      name: [this.user?.name || ''],
      email: [this.user?.email || '', Validators.email],
    });
  }

  onSubmit() {
    this.id = this.user?._id;
    if (this.updateForm.valid) {
      const name = this.updateForm.value.name;
      const email = this.updateForm.value.email;
      const body = { name, email };

      this.userService.updateUser(this.id, body).subscribe({
        next: (resp) => {
          localStorage.setItem('userData', JSON.stringify(resp));
          this.isProfileUpdated = 'success';
        },
        error: (err) => {
          this.isProfileUpdated = 'failure';
          console.log(err.error);
        },
      });
    }
    this.isProfileUpdated = '';
  }
}
