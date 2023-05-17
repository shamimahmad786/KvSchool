import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStafftypeComponent } from '../stafftype-master/add-stafftype/add-stafftype.component';
import { AddStafftypePostComponent } from './add-stafftype-post/add-stafftype-post.component';
import { StafftypePostMappingComponent } from './stafftype-post-mapping.component';

const routes: Routes = [
  { path: '', component: StafftypePostMappingComponent },
  { path: 'add', component: AddStafftypePostComponent },
  { path: 'edit', component: AddStafftypePostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StafftypePostMappingRoutingModule { }
