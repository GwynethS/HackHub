import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './course-detail.component';
import { CourseDetailRoutingModule } from './courses-detail-routing.module';
import { SharedModule } from '../../../../../../shared/shared.module';
import { EnrollmentService } from '../../../enrollment/enrollment.service';


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
    EnrollmentService
  ]
})
export class CourseDetailModule { }
