import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TramListComponent } from './tram-list/tram-list.component';

const routes: Routes = [
  {
    path: '', component: TramListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TramRoutingModule { }
