import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './credentials/change-password/change-password.component';
import { AuthGuard } from './guard/AuthGuard';
import { KvsTeacherProfileComponent } from './kvs/kvs-teacher-profile/kvs-teacher-profile.component';
import { KvsTeacherTransferComponent } from './kvs/kvs-teacher-transfer/kvs-teacher-transfer.component';
import { KvsTeachersDeatilComponent } from './kvs/kvs-teachers-deatil/kvs-teachers-deatil.component';
import { KvsTransferEditComponent } from './kvs/kvs-transfer-edit/kvs-transfer-edit.component';
import { KvsIdentifySurplusComponent } from './kvs/surplus/kvs-identify-surplus/kvs-identify-surplus.component';
import { KvsSurplusListingComponent } from './kvs/surplus/kvs-surplus-listing/kvs-surplus-listing.component';
import { KvsSurplusStaffComponent } from './kvs/surplus/kvs-surplus-staff/kvs-surplus-staff.component';
import { ProfileComponent } from './profile/profile.component';
import { NationalReportComponent } from './reports/national-report/national-report.component';
import { SchoolReportComponent } from './reports/school-report/school-report.component';
import { SurveyMasterComponent } from './survey/surveyMaster/survey-master/survey-master.component';
import { MainPageComponent } from './tDashboard/main-page/main-page.component';
import { NationalDashboardComponent } from './tDashboard/national-dashboard/national-dashboard.component';
import { RegionDashboardComponent } from './tDashboard/region-dashboard/region-dashboard.component';
import { StationDashboardComponent } from './tDashboard/station-dashboard/station-dashboard.component';
import { TDashboardComponent } from './tDashboard/t-dashboard/t-dashboard.component';
import { CustomFormSelectionComponent } from './teacherEntryForm/stateOrUserSpecificForm/custom-form-selection/custom-form-selection.component';
import { TeacherEntryFormComponent } from './teacherEntryForm/teacher-entry-form/teacher-entry-form.component';
import { TeacherComponent } from './teacherEntryForm/teacher.component';
import { TeacherDropboxComponent } from './teacherEntryForm/teacherDropbox/teacher-dropbox/teacher-dropbox.component';
import { TeacherInboxComponent } from './teacherEntryForm/teacherDropbox/teacher-dropbox/teacher-inbox/teacher-inbox.component';
import { TeacheroutboxComponent } from './teacherEntryForm/teacherDropbox/teacher-dropbox/teacheroutbox/teacheroutbox.component';
import { TeachersDetailComponent } from './teacherEntryForm/teachersDetail/teachers-detail/teachers-detail.component';
import { UpdateMobileEmailComponent } from './teacherEntryForm/teacherUpdateMobileEmail/update-mobile-email/update-mobile-email.component';
import { ReportGridComponent } from './reports/report-grid/report-grid.component';
import { KvTchSanctionedPostComponent } from './kvs/sanctionedPost/kv-tch-sanctioned-post/kv-tch-sanctioned-post.component';
import {LoginComponent} from './login/login.component';
const routes: Routes = [
  {path:'', component: MainPageComponent},
  {path:'mainPage', component: MainPageComponent},
  {path:'tDashboard', component: TDashboardComponent},
  {path:'login', component:LoginComponent},
  {path: 'teacher', component:TeacherComponent,canActivate: [AuthGuard], children:[
      {path:'', component: ProfileComponent},
      {path:'profile', component: ProfileComponent},
      {path:'nationalDashboard', component: NationalDashboardComponent},
      {path:'regionDashboard', component: RegionDashboardComponent},
      {path:'stationDashboard', component: StationDashboardComponent},
      {path: 'teacherHome', component:TeacherEntryFormComponent} ,
      {path: 'customForm', component:CustomFormSelectionComponent},
      {path: 'teachersDetail', component:TeachersDetailComponent},
      {path: 'teachersDropbox', component:TeacherDropboxComponent},
      {path: 'teacherInbox', component:TeacherInboxComponent},
      {path: 'teacherOutbox', component:TeacheroutboxComponent},
      {path: 'updateEmailMobile', component:UpdateMobileEmailComponent},
      {path: 'surveyMaster', component:SurveyMasterComponent},
      {path: 'kvsTchProfile', component:KvsTeacherProfileComponent},
      {path: 'kvsTchTransfer', component:KvsTeacherTransferComponent},
      {path: 'kvsTchDetails', component:KvsTeachersDeatilComponent},
      {path: 'transferEdit', component:KvsTransferEditComponent},
      {path: 'surplusListing', component:KvsSurplusListingComponent},
      {path: 'identifySurplus', component:KvsIdentifySurplusComponent},
      {path: 'surplusStaff', component:KvsSurplusStaffComponent},
      {path: 'nationalReport', component:NationalReportComponent},
      {path: 'schoolReport', component:SchoolReportComponent},
      {path:'changePassword', component:ChangePasswordComponent},
      {path:'reportGrid', component:ReportGridComponent},
      {path:'kvSanctionedPost', component:KvTchSanctionedPostComponent},

      {path: 'regionMaster', loadChildren: () => import('./components/region-master/region-master.module').then(m => m.RegionMasterModule) },
      {path: 'stationMaster', loadChildren: () => import('./components/station-master/station-master.module').then(m => m.StationMasterModule) },
      {path: 'schoolMaster', loadChildren: () => import('./components/school-master/school-master.module').then(m => m.SchoolMasterModule) },
      {path: 'stationCategoryMaster', loadChildren: () => import('./components/station-category-master/station-category-master.module').then(m => m.StationCategoryMasterModule) },

      {path: 'regionStationMapping', loadChildren: () => import('./components/region-station-mapping/region-station-mapping.module').then(m => m.RegionStationMappingModule) },
      {path: 'schoolStationMapping', loadChildren: () => import('./components/school-station-mapping/school-station-mapping.module').then(m => m.SchoolStationMappingModule) },
      {path: 'stationCategoryMapping', loadChildren: () => import('./components/station-category-mapping/station-category-mapping.module').then(m => m.StationCategoryMappingModule) },
     
      { path: 'stafftypeMaster', loadChildren: () => import('./components/stafftype-master/stafftype-master.module').then(m => m.StafftypeMasterModule) },
      { path: 'subjectMaster', loadChildren: () => import('./components/subject-master/subject-master.module').then(m => m.SubjectMasterModule) },
      { path: 'designationMaster', loadChildren: () => import('./components/designation-master/designation-master.module').then(m => m.DesignationMasterModule) },

      { path: 'stafftypePostMapping', loadChildren: () => import('./components/stafftype-post-mapping/stafftype-post-mapping.module').then(m => m.StafftypePostMappingModule) },
      { path: 'postSubjectMapping', loadChildren: () => import('./components/post-subject-mapping/post-subject-mapping.module').then(m => m.PostSubjectMappingModule) },
      { path: 'sanctioned-post', loadChildren: () => import('./components/sanctioned-post/sanctioned-post.module').then(m => m.SanctionedPostModule) },


    ]},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
