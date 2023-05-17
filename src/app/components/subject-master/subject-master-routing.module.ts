import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { SubjectMasterComponent } from './subject-master.component';

const routes: Routes = [
  { path: '', component: SubjectMasterComponent },
  { path: 'add', component: AddSubjectComponent },
  { path: 'edit', component: AddSubjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectMasterRoutingModule { }
