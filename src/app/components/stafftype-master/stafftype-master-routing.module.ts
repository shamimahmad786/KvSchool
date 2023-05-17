import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStafftypeComponent } from './add-stafftype/add-stafftype.component';
import { StafftypeMasterComponent } from './stafftype-master.component';

const routes: Routes = [
  { path: '', component: StafftypeMasterComponent },
  { path: 'add', component: AddStafftypeComponent },
  { path: 'edit', component: AddStafftypeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StafftypeMasterRoutingModule { }
