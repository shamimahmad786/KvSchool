import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStationCategoryComponent } from './add-station-category/add-station-category.component';
import { StationCategoryMasterComponent } from './station-category-master.component';

const routes: Routes = [
  { path: '', component: StationCategoryMasterComponent },
  { path: 'add', component: AddStationCategoryComponent },
  { path: 'edit', component: AddStationCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationCategoryMasterRoutingModule { }
