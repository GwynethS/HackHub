import { Component } from '@angular/core';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models/user';
import { UsersService } from './users.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users: User[] = [];

  constructor(private usersService: UsersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }

  onCreateUser(): void {
    this.dialog
      .open(UsersDialogComponent)
      .afterClosed()
      .subscribe({
        next: (userData) => {
          if (userData) {
            this.usersService.createUser(userData).subscribe({
              next: (users) => {
                this.users = users;
              },
            });
          }
        },
      });
  }

  onEditUser(ev: User) {
    this.dialog
      .open(UsersDialogComponent, {
        data: ev,
      })
      .afterClosed()
      .subscribe({
        next: (userData) => {
          if (userData) {
            this.usersService.updateUser(ev.id, userData).subscribe({
              next: (users) => {
                this.users = users;
              },
            });
          }
        },
      });
  }

  onDeleteUser(id: number): void {
    this.usersService.deleteUserById(id).subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }
}
