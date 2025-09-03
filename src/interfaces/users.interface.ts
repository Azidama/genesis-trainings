import { registerEnumType } from "type-graphql";

export interface User {
  id: string
  email: string
  password: string
  name: string
}

export interface UserInfo {
  id: string
  email: string
  name?: string
}

export enum UserRole {
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  ADMIN = 'Admin',
}

registerEnumType(UserRole, {
  name: "UserRole",
  description: "The allowed roles for a user", 
})
