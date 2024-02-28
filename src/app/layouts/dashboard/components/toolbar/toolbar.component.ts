import { Component } from '@angular/core';
import { User } from '../../pages/users/models/user';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../../core/store/auth/selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  authUser$: Observable<User | null>;

  constructor(private store: Store) {
    this.authUser$ = this.store.select(selectAuthUser);
  }
}
