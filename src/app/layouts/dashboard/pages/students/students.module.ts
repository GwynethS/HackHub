import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { SharedModule } from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentsFormComponent,
    StudentsTableComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports:[
    StudentsComponent
  ]
})
export class StudentsModule { }
