import { User } from '@interfaces/users.interface'

export interface DataStoredInToken {
  user: User
}

export interface TokenData {
  token: string
  expiresIn: number
}

export interface RequestWithUser {
  user: User
}
