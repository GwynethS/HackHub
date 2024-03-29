import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ],
  exports:[
    DashboardComponent
  ]
})
export class DashboardModule { }
