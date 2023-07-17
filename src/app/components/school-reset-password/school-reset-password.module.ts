import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolResetPasswordRoutingModule } from './school-reset-password-routing.module';
//import { SchoolResetPasswordComponent } from './school-reset-password.component';
import { QCommonModule } from '../q-common/q-common.module';
import { SchoolResetPasswordComponent } from './school-reset-password.component';


@NgModule({
  declarations: [
    SchoolResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SchoolResetPasswordRoutingModule,
    QCommonModule
  ]
})
export class SchoolResetPasswordModule { }
