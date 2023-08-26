import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormCreateTaskComponent } from './components/form-create-task/form-create-task.component';
import { ShowTasksComponent } from './components/show-tasks/show-tasks.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, FormCreateTaskComponent, ShowTasksComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [NavbarComponent, FormCreateTaskComponent, ShowTasksComponent],
  providers: [CookieService],
})
export class SharedModule {}
