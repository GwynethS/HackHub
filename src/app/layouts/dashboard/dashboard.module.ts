import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StudentsModule } from './pages/students/students.module';
import { SharedModule } from '../../shared/shared.module';
import { CoursesModule } from './pages/courses/courses.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsModule,
    CoursesModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
