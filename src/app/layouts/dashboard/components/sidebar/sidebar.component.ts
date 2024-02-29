import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../pages/users/models/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../../core/store/auth/selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  collapsed = true;
  authUser$: Observable<User | null>;

  @Output()
    collapsedChange = new EventEmitter<boolean>();

  constructor(private authService : AuthService, private store: Store){
    this.authUser$ = this.store.select(selectAuthUser);
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
