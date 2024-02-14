import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  collapsed = false;

  @Output()
    collapsedChange = new EventEmitter<boolean>();

  constructor(private authService : AuthService){}

  toogleCollapse(){
    this.collapsed = !this.collapsed;
  }

  closeSidebar(){
    this.collapsed = false;
  }

  logOut(){
    this.authService.logOut();
  }
}
