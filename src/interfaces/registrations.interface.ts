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
  hasPaid: boolean
  trainingMode?: string
  heardAboutUs?: string
  deletedAt?: Date
}

export interface RegistrationListResult {
  registrations: Registration[]
  count: number
  page: number
  totalPages: number
}