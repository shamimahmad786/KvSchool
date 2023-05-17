import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSchoolStationComponent } from './add-school-station/add-school-station.component';
import { SchoolStationMappingComponent } from './school-station-mapping.component';

const routes: Routes = [
  { path: '', component: SchoolStationMappingComponent },
  { path: 'add', component: AddSchoolStationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolStationMappingRoutingModule { }
