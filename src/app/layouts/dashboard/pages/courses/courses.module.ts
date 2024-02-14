import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { CoursesService } from './courses.service';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { StudentsService } from '../students/students.service';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesTableComponent,
    CoursesDialogComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports:[
    CoursesComponent
  ],
  providers: [
    StudentsService,
    CoursesService,
    EnrollmentService
  ]
})
export class CoursesModule { }
