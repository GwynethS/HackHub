import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
