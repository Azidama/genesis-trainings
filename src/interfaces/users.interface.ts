import { registerEnumType } from "type-graphql";

export interface User {
  id: string
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export interface UserInfo {
  id: string
  email: string
  firstName?: string
  lastName?: string
}

export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

registerEnumType(UserRole, {
  name: "UserRole",
  description: "The allowed roles for a user", 
})
