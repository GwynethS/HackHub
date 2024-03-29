import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { StudentsService } from './students.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { CoursesService } from '../courses/courses.service';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsDialogComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports:[
    StudentsComponent
  ],
  providers:[
    StudentsService,
    CoursesService,
    EnrollmentService
  ]
})
export class StudentsModule { }
