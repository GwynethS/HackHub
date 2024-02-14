import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../pages/users/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  collapsed = false;
  authUser: User | null = null;

  @Output()
    collapsedChange = new EventEmitter<boolean>();

  constructor(private authService : AuthService){
    if(authService.authUser){
      this.authUser = authService.authUser;
    }
  }

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
