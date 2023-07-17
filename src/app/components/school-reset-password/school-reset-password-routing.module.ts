import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolResetPasswordComponent } from './school-reset-password.component';

const routes: Routes = [{ path: '', component: SchoolResetPasswordComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolResetPasswordRoutingModule { }
