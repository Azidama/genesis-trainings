import { registerEnumType } from "type-graphql"

export interface Course {
  title: string
  code: string
  description: string
}

export enum CourseMode {
  ONLINE = 'Online',
  LAHORE_CAMPUS = 'Lahore Campus',
  ISLAMABAD_CAMPUS = 'Islamabad Campus',
}


registerEnumType(CourseMode, {
  name: "CourseMode",
  description: "Mode of training.", 
})