import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './course-detail.component';
import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { EnrollmentService } from '../../../enrollment/enrollment.service';
import { CoursesService } from '../../courses.service';
import { StudentsService } from '../../../students/students.service';


@NgModule({
  declarations: [
    CourseDetailComponent,
  ],
  imports: [
    CommonModule,
    CourseDetailRoutingModule,
    SharedModule
  ],
  providers: [
    StudentsService,
    CoursesService,
    EnrollmentService
  ]
})
export class CourseDetailModule { }
