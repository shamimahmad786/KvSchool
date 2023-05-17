import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRegionComponent } from './add-region/add-region.component';
import { RegionMasterComponent } from './region-master.component';

const routes: Routes = [
  { path: '', component: RegionMasterComponent },
  { path:'add',component:AddRegionComponent},
  { path:'edit',component:AddRegionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionMasterRoutingModule { }
