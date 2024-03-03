import { Component, OnDestroy } from '@angular/core';
import { Course } from './models/course';
import { CoursesService } from './courses.service';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnDestroy {
  courses: Course[] = [];

  subscriptions: Subscription[] = [];

  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.courseService.getCourses().subscribe({
        next: (courses) => {
          this.courses = courses;
        },
      })
    );
  }

  onCreateCourse(): void {
    this.subscriptions.push(
      this.dialog
        .open(CoursesDialogComponent)
        .afterClosed()
        .subscribe({
          next: (courseData) => {
            if (courseData) {
              this.courseService.createCourse(courseData).subscribe({
                next: (courses) => {
                  this.courses = courses;
                },
              });
            }
          },
        })
    );
  }

  onEditCourse(ev: Course) {
    this.subscriptions.push(
      this.dialog
        .open(CoursesDialogComponent, {
          data: ev,
        })
        .afterClosed()
        .subscribe({
          next: (courseData) => {
            if (courseData) {
              this.courseService.updateCourse(ev.id, courseData).subscribe({
                next: (courses) => {
                  this.courses = courses;
                },
              });
            }
          },
        })
    );
  }

  onDeleteCourse(id: string): void {
    this.alertService.showConfirmDeleteAction('este curso').then((result) => {
      if (result.isConfirmed) {
        this.subscriptions.push(
          this.courseService.deleteCourseById(id).subscribe({
            next: (courses) => {
              this.courses = courses;
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
