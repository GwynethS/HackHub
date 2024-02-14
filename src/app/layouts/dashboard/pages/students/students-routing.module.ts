import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';


const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: StudentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }