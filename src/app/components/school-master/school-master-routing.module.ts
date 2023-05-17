import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSchoolComponent } from './add-school/add-school.component';
import { SchoolMasterComponent } from './school-master.component';

const routes: Routes = [
  { path: '', component: SchoolMasterComponent },
  { path: 'add', component: AddSchoolComponent },
  { path: 'edit', component: AddSchoolComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolMasterRoutingModule { }
