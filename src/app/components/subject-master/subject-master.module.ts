import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectMasterRoutingModule } from './subject-master-routing.module';
import { SubjectMasterComponent } from './subject-master.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { QCommonModule } from '../q-common/q-common.module';


@NgModule({
  declarations: [
    SubjectMasterComponent,
    AddSubjectComponent
  ],
  imports: [
    CommonModule,
    SubjectMasterRoutingModule,
    QCommonModule
  ]
})
export class SubjectMasterModule { }
