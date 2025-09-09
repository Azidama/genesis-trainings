
export interface Registration {
  id: string
  email: string
  name: string
  gender?: string
  fatherName: string
  education?: string
  city?: string
  cnic?: string
  phone?: string
  courses?: string[]
  trainingMode?: string
  heardAboutUs?: string
}


// export enum CourseMode {
//   ONLINE = 'Online',
//   LAHORE_CAMPUS = 'Lahore Campus',
//   ISLAMABAD_CAMPUS = 'Islamabad Campus',
// }


// registerEnumType(CourseMode, {
//   name: "CourseMode",
//   description: "Mode of training.", 
// })
