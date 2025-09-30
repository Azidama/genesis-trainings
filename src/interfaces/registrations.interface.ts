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

export interface RegistrationListResult {
  registrations: Registration[]
  count: number
  page: number
  totalPages: number
}