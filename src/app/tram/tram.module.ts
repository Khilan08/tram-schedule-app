import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramRoutingModule } from './tram-routing.module';
import { TramListComponent } from './tram-list/tram-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TramListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TramRoutingModule
  ]
})
export class TramModule { }
