import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationMasterRoutingModule } from './designation-master-routing.module';
import { DesignationMasterComponent } from './designation-master.component';
import { QCommonModule } from '../q-common/q-common.module';
import { AddDesignationComponent } from './add-designation/add-designation.component';


@NgModule({
  declarations: [
    DesignationMasterComponent,
    AddDesignationComponent
  ],
  imports: [
    CommonModule,
    DesignationMasterRoutingModule,
    QCommonModule
  ]
})
export class DesignationMasterModule { }
