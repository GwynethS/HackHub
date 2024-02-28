export interface Enrollment{
  id: number,
  studentId: number,
  courseId: number,
  enrollmentDate: Date
}

export interface CreateEnrollmentData{
  studentId: number,
  courseId: number,
}