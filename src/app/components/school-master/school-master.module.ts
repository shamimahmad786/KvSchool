import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolMasterRoutingModule } from './school-master-routing.module';
import { SchoolMasterComponent } from './school-master.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { QCommonModule } from '../q-common/q-common.module';
import { InstitutionType,ExperienceType,AppointedForLevelPipe, BloodGroupPipe, ClassTaughtPipe, DisabilityPipe, GenderPipe, HAcdQualPipe, MainSubjectPipe, MaritalStatusPipe, NationalityPipe, NatureOfApntmntPipe, NatureOfAppointmentPipe, ProfQualPipe, SocialCatPipe, StaffTypePipe, TecahingNonTeaching, TrainingPipe, TransferGroundPipe, TypeOfTeacherPipe, YesNoPipe } from '../../utilities/myPipe/myPipe';

@NgModule({
  declarations: [
    SchoolMasterComponent,
    AddSchoolComponent,
    InstitutionType
  ],
  imports: [
    CommonModule,
    SchoolMasterRoutingModule,
    QCommonModule, 
  ]
})
export class SchoolMasterModule { }
