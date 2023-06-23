import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanctionedAllPostRoutingModule } from './sanctioned-all-post-routing.module';
//import { SanctionedAllPostComponent } from './sanctioned-all-post/sanctioned-all-post.component';
import { SanctionedAllPostComponent } from './sanctioned-all-post.component';
import { QCommonModule } from '../q-common/q-common.module';


@NgModule({
  declarations: [
    SanctionedAllPostComponent
  ],
  imports: [
    CommonModule,
    SanctionedAllPostRoutingModule,
    QCommonModule
  ]
})
export class SanctionedAllPostModule { }
