import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationMasterRoutingModule } from './station-master-routing.module';
import { StationMasterComponent } from './station-master.component';
import { AddStationComponent } from './add-station/add-station.component';
import { QCommonModule } from '../q-common/q-common.module';


@NgModule({
  declarations: [
    StationMasterComponent,
    AddStationComponent
  ],
  imports: [
    CommonModule,
    StationMasterRoutingModule,
    QCommonModule
  ]
})
export class StationMasterModule { }
