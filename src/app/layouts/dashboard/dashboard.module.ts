import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StudentsModule } from './pages/students/students.module';
import { SharedModule } from '../../shared/shared.module';
import { CoursesModule } from './pages/courses/courses.module';
import { RouterModule } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsModule,
    CoursesModule,
    RouterModule.forChild([
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
    ])
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
