import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostSubjectMappingRoutingModule } from './post-subject-mapping-routing.module';
import { PostSubjectMappingComponent } from './post-subject-mapping.component';
import { AddPostSubjectComponent } from './add-post-subject/add-post-subject.component';
import { QCommonModule } from '../q-common/q-common.module';


@NgModule({
  declarations: [
    PostSubjectMappingComponent,
    AddPostSubjectComponent
  ],
  imports: [
    CommonModule,
    PostSubjectMappingRoutingModule,
    QCommonModule
  ]
})
export class PostSubjectMappingModule { }
