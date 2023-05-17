import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationCategoryMappingRoutingModule } from './station-category-mapping-routing.module';
import { StationCategoryMappingComponent } from './station-category-mapping.component';
import { QCommonModule } from '../q-common/q-common.module';
import { AddStationCategoryComponent } from './add-station-category/add-station-category.component';


@NgModule({
  declarations: [
    StationCategoryMappingComponent,
    AddStationCategoryComponent
  ],
  imports: [
    CommonModule,
    StationCategoryMappingRoutingModule,
    QCommonModule
  ]
})
export class StationCategoryMappingModule { }
