import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent {
  @Input()
    dataSource: User[] = [];
  
  @Output()
    editUser = new EventEmitter<User>();

  @Output()
    deleteUser = new EventEmitter<number>();

  displayedColumns = ['id', 'fullname', 'email', 'role','actions'];

  constructor() {}

}
