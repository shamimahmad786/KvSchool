import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionStationMappingRoutingModule } from './region-station-mapping-routing.module';
import { RegionStationMappingComponent } from './region-station-mapping.component';
import { QCommonModule } from '../q-common/q-common.module';
import { AddRegionStationComponent } from './add-region-station/add-region-station.component';


@NgModule({
  declarations: [
    RegionStationMappingComponent,
    AddRegionStationComponent
  ],
  imports: [
    CommonModule,
    RegionStationMappingRoutingModule,
    QCommonModule
  ]
})
export class RegionStationMappingModule { }
