import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanctionedPostRoutingModule } from './sanctioned-post-routing.module';
import { SanctionedPostComponent } from './sanctioned-post.component';
import { QCommonModule } from '../q-common/q-common.module';


@NgModule({
  declarations: [
    SanctionedPostComponent
  ],
  imports: [
    CommonModule,
    SanctionedPostRoutingModule,
    QCommonModule
  ]
})
export class SanctionedPostModule { }
