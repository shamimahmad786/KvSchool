import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionMasterRoutingModule } from './region-master-routing.module';
import { RegionMasterComponent } from './region-master.component';
import { QCommonModule } from '../q-common/q-common.module';
import { AddRegionComponent } from './add-region/add-region.component';
import { MaterialModule } from 'src/app/mat/material/material.module';



@NgModule({
  declarations: [
    RegionMasterComponent,
    AddRegionComponent
  ],
  imports: [
    CommonModule,
    RegionMasterRoutingModule,
    QCommonModule, MaterialModule
  ]
})
export class RegionMasterModule { }
