import { UserInfo } from '@interfaces/users.interface'

export interface DataStoredInToken {
  user: UserInfo
}

export interface TokenData {
  token: string
  expiresIn: number
}

export interface RequestWithUser {
  user: UserInfo
}
