import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
