import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SanctionedPostComponent } from './sanctioned-post.component';

const routes: Routes = [{ path: '', component: SanctionedPostComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanctionedPostRoutingModule { }
