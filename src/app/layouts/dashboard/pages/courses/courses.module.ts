import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';



@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CoursesComponent
  ]
})
export class CoursesModule { }
