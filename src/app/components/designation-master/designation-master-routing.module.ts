import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDesignationComponent } from './add-designation/add-designation.component';
import { DesignationMasterComponent } from './designation-master.component';

const routes: Routes = [
  { path: '', component: DesignationMasterComponent },
  { path: 'add', component: AddDesignationComponent },
  { path: 'edit', component: AddDesignationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationMasterRoutingModule { }
