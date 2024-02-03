import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseDetailRoutingModule } from './course-detail-routing.module';
import { CourseDetailComponent } from './course-detail.component';
import { CourseClassTableComponent } from './course-class-table/course-class-table.component';
import { CourseClassDialogComponent } from './components/course-class-dialog/course-class-dialog.component';


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
