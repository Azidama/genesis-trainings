import { CourseMode } from "./courses.interface"

export interface Application {
  id: string
  email: string
  name: string
  gender?: string
  fatherName: string
  education?: string
  city?: string
  cnic?: string
  phoneNumber?: string
  trainingMode?: CourseMode
  heardAboutUs?: string
}
