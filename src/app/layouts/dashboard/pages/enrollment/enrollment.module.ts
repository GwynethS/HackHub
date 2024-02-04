import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentComponent } from './enrollment.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EnrollmentTableComponent } from './components/enrollment-table/enrollment-table.component';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';


@NgModule({
  declarations: [
    EnrollmentComponent,
    EnrollmentTableComponent,
    EnrollmentDialogComponent
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    SharedModule
  ]
})
export class EnrollmentModule { }
