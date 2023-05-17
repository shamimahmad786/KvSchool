import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StafftypePostMappingRoutingModule } from './stafftype-post-mapping-routing.module';
import { StafftypePostMappingComponent } from './stafftype-post-mapping.component';
import { AddStafftypePostComponent } from './add-stafftype-post/add-stafftype-post.component';
import { QCommonModule } from '../q-common/q-common.module';


@NgModule({
  declarations: [
    StafftypePostMappingComponent,
    AddStafftypePostComponent
  ],
  imports: [
    CommonModule,
    StafftypePostMappingRoutingModule,
    QCommonModule
  ]
})
export class StafftypePostMappingModule { }
