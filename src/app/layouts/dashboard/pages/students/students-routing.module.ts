import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';


const routes: Routes = [
  {
    path: '',
    component: StudentsComponent
  },
  {
    path: 'student-detail/:id',
    loadChildren: () =>
      import('./pages/student-detail/student-detail.module').then(
        (m) => m.StudentDetailModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }