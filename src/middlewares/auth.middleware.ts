import { verify } from 'jsonwebtoken'
import { AuthChecker } from 'type-graphql'
import { SECRET_KEY } from '@config'
import { UserEntity } from '@entities/users.entity'
import { RequestWithUser, DataStoredInToken } from '@interfaces/auth.interface'
import { AuthenticationError } from 'apollo-server-core'
import AppDataSource from '@/database/config'

const getAuthorization = req => {
  const cookie = req.cookies['Authorization']
  if (cookie) return cookie

  const header = req.header('Authorization')
  if (header) return header.split('Bearer ')[1]

  return null
}

export const AuthMiddleware = async req => {
  try {
    const Authorization = getAuthorization(req)

    if (Authorization) {
      const { user } = verify(Authorization, SECRET_KEY) as DataStoredInToken
      const id = user.id
      const userRepository = AppDataSource.getRepository(UserEntity)
      const findUser = await userRepository.findOne({
         where: { id }, 
         select: ['id', 'email', 'role'] 
        })
      return findUser
    }

    return null
  } catch (error) {
    throw new AuthenticationError('UNAUTHENTICATED')
  }
}

export const AuthCheckerMiddleware: AuthChecker<RequestWithUser> = async ({ context: { user } }, roles) => {
  if (!user) {
    throw new AuthenticationError('UNAUTHENTICATED')
  }

  if (roles.length === 0) {
    return true
  }

  if (roles.includes(user.role)) {
    return true
  }

  throw new AuthenticationError('FORBIDDEN')
}
