import { Component, OnDestroy } from '@angular/core';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models/user';
import { UsersService } from './users.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnDestroy {
  users: User[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.usersService.getUsers().subscribe({
        next: (users) => {
          this.users = users;
        },
      })
    );
  }

  onCreateUser(): void {
    this.subscriptions.push(
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
        })
    );
  }

  onEditUser(ev: User) {
    this.subscriptions.push(
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
        })
    );
  }

  onDeleteUser(id: string): void {
    this.alertService.showConfirmDeleteAction('este usuario').then((result) => {
      if (result.isConfirmed) {
        this.subscriptions.push(
          this.usersService.deleteUserById(id).subscribe({
            next: (users) => {
              this.users = users;
            },
          })
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((suscription) => suscription.unsubscribe());
  }
}
