import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentRoutingModule } from './enrollment-routing.module';
import { EnrollmentComponent } from './enrollment.component';
import { SharedModule } from '../../../../shared/shared.module';
import { EnrollmentTableComponent } from './components/enrollment-table/enrollment-table.component';
import { EnrollmentDialogComponent } from './components/enrollment-dialog/enrollment-dialog.component';
import { EnrollmentService } from './enrollment.service';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';


@NgModule({
  declarations: [
    EnrollmentComponent,
    EnrollmentTableComponent,
    EnrollmentDialogComponent
  ],
  imports: [
    CommonModule,
    EnrollmentRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    StudentsService,
    CoursesService,
    EnrollmentService
  ]
})
export class EnrollmentModule { }
