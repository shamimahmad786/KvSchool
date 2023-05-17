import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostSubjectComponent } from './add-post-subject/add-post-subject.component';
import { PostSubjectMappingComponent } from './post-subject-mapping.component';

const routes: Routes = [
  { path: '', component: PostSubjectMappingComponent },
  { path: 'add', component: AddPostSubjectComponent },
  { path: 'edit', component: AddPostSubjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostSubjectMappingRoutingModule { }
