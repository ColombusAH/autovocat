import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlowsComponent } from './flows.component';


const routes: Routes = [
  { path: '', component: FlowsComponent }
];

@NgModule({
  declarations: [
    FlowsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FlowsModule { }
