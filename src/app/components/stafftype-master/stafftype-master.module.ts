import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StafftypeMasterRoutingModule } from './stafftype-master-routing.module';
import { StafftypeMasterComponent } from './stafftype-master.component';
import { AddStafftypeComponent } from './add-stafftype/add-stafftype.component';
import { QCommonModule } from '../q-common/q-common.module';


@NgModule({
  declarations: [
    StafftypeMasterComponent,
    AddStafftypeComponent
  ],
  imports: [
    CommonModule,
    StafftypeMasterRoutingModule,
    QCommonModule
  ]
})
export class StafftypeMasterModule { }
