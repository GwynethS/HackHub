export interface Enrollment{
  id: string,
  studentId: string,
  courseId: string,
  enrollmentDate: Date
}

export interface CreateEnrollmentData{
  studentId: string,
  courseId: string,
}