import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './course-detail.component';
import { CourseClassDialogComponent } from './components/course-class-dialog/course-class-dialog.component';
import { CourseClassTableComponent } from './components/course-class-table/course-class-table.component';
import { CourseDetailRoutingModule } from './courses-detail-routing.module';


@NgModule({
  declarations: [
    CourseDetailComponent,
    CourseClassTableComponent,
    CourseClassDialogComponent
  ],
  imports: [
    CommonModule,
    CourseDetailRoutingModule
  ]
})
export class CourseDetailModule { }
