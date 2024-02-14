import { Component } from '@angular/core';
import { User } from '../../pages/users/models/user';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  authUser: User | null = null;

  constructor(private authService : AuthService){
    if(authService.authUser){
      this.authUser = authService.authUser;
    }
  }
}
