import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolMasterRoutingModule } from './school-master-routing.module';
import { SchoolMasterComponent } from './school-master.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { QCommonModule } from '../q-common/q-common.module';


@NgModule({
  declarations: [
    SchoolMasterComponent,
    AddSchoolComponent
  ],
  imports: [
    CommonModule,
    SchoolMasterRoutingModule,
    QCommonModule
  ]
})
export class SchoolMasterModule { }
