import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SanctionedAllPostComponent } from './sanctioned-all-post.component';
const routes: Routes = [{ path: '', component: SanctionedAllPostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanctionedAllPostRoutingModule { }
