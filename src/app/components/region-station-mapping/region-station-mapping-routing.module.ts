import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRegionStationComponent } from './add-region-station/add-region-station.component';
import { RegionStationMappingComponent } from './region-station-mapping.component';

const routes: Routes = [
  { path: '', component: RegionStationMappingComponent },
  { path: 'add', component: AddRegionStationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionStationMappingRoutingModule { }
