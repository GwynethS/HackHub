import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentComponent } from './enrollment.component';


@NgModule({
  declarations: [
    EnrollmentComponent
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule
  ]
})
export class EnrollmentModule { }
