import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStationCategoryComponent } from './add-station-category/add-station-category.component';
import { StationCategoryMappingComponent } from './station-category-mapping.component';

const routes: Routes = [
  { path: '', component: StationCategoryMappingComponent },
  { path: 'add', component: AddStationCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationCategoryMappingRoutingModule { }
