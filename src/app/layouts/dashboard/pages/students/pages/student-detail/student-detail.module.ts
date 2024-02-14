import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDetailRoutingModule } from './student-detail-routing.module';
import { StudentDetailComponent } from './student-detail.component';
import { SharedModule } from '../../../../../../shared/shared.module';
import { StudentsService } from '../../students.service';
import { CoursesService } from '../../../courses/courses.service';
import { EnrollmentService } from '../../../enrollment/enrollment.service';


@NgModule({
  declarations: [
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentDetailRoutingModule,
    SharedModule
  ],
  providers:[
    StudentsService,
    CoursesService,
    EnrollmentService
  ]
})
export class StudentDetailModule { }
