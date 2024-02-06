import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDetailRoutingModule } from './student-detail-routing.module';
import { StudentDetailComponent } from './student-detail.component';
import { SharedModule } from '../../../../../../shared/shared.module';


@NgModule({
  declarations: [
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentDetailRoutingModule,
    SharedModule
  ]
})
export class StudentDetailModule { }
