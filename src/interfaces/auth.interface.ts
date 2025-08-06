import { User } from '@interfaces/users.interface'

export interface DataStoredInToken {
  id: string
  email?: string
  name?: string
}

export interface TokenData {
  token: string
  expiresIn: number
}

export interface RequestWithUser {
  user: User
}
