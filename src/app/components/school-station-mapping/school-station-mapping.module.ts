import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolStationMappingRoutingModule } from './school-station-mapping-routing.module';
import { SchoolStationMappingComponent } from './school-station-mapping.component';
import { QCommonModule } from '../q-common/q-common.module';
import { AddSchoolStationComponent } from './add-school-station/add-school-station.component';


@NgModule({
  declarations: [
    SchoolStationMappingComponent,
    AddSchoolStationComponent
  ],
  imports: [
    CommonModule,
    SchoolStationMappingRoutingModule,
    QCommonModule
  ]
})
export class SchoolStationMappingModule { }
