import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationCategoryMasterRoutingModule } from './station-category-master-routing.module';
import { StationCategoryMasterComponent } from './station-category-master.component';
import { AddStationCategoryComponent } from './add-station-category/add-station-category.component';
import { QCommonModule } from '../q-common/q-common.module';


@NgModule({
  declarations: [
    StationCategoryMasterComponent,
    AddStationCategoryComponent
  ],
  imports: [
    CommonModule,
    StationCategoryMasterRoutingModule,
    QCommonModule
  ]
})
export class StationCategoryMasterModule { }
