import { Student } from "../../students/models/student"
import { Course } from '../../courses/models/course';

export interface Enrollment{
  id: string,
  studentId: string,
  courseId: string,
  enrollmentDate: Date,
  student?: Student,
  course?: Course
}

export interface CreateEnrollmentData{
  studentId: string,
  courseId: string,
}