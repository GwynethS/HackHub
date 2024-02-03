import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'students',
    loadChildren: () =>
      import('./pages/students/students.module').then(
        (m) => m.StudentsModule
      )
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./pages/courses/courses.module').then(
        (m) => m.CoursesModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }