import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentsFormComponent,
    StudentsTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StudentsModule { }
