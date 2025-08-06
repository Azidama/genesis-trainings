export interface User {
  id: string
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}
