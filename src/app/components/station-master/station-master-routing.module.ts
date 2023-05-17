import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStationComponent } from './add-station/add-station.component';
import { StationMasterComponent } from './station-master.component';

const routes: Routes = [
  { path: '', component: StationMasterComponent },
  { path: 'add', component: AddStationComponent },
  { path: 'edit', component: AddStationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationMasterRoutingModule { }
