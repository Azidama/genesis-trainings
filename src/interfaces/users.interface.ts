export interface User {
  id: string
  email: string
  password: string
  name: string
  role?: string
}

export interface UserInfo {
  id: string
  email: string
  name?: string
  role?: string
}

export enum UserRole {
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  ADMIN = 'Admin',
}
