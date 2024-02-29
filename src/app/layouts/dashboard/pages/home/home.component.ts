import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { Observable } from 'rxjs';
import { User } from '../users/models/user';
import { Student } from '../students/models/student';
import { Course } from '../courses/models/course';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';
import { Enrollment } from '../enrollment/models/enrollment';
import { Store } from '@ngrx/store';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { selectAuthUser } from '../../../../core/store/auth/selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  registeredUsers$: Observable<User[]>;
  registeredStudents$: Observable<Student[]>;
  registeredCourses$: Observable<Course[]>;
  registeredEnrollments$: Observable<Enrollment[]>;

  authUser$: Observable<User | null>;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentService: EnrollmentService,
    private store: Store
  ) {
    this.authUser$ = this.store.select(selectAuthUser);

    this.registeredUsers$ = this.usersService.getUsers();
    this.registeredStudents$ = this.studentsService.getStudents();
    this.registeredCourses$ = this.coursesService.getCourses();
    this.registeredEnrollments$ = this.enrollmentService.getEnrollments();
  }

  redirectTo(page: string): void {
    this.router.navigate([`/dashboard/${page}`]);
  }
}
