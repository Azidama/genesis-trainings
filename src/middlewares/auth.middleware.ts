import { verify } from 'jsonwebtoken'
import { AuthChecker } from 'type-graphql'
import { getRepository } from 'typeorm'
import { SECRET_KEY } from '@config'
import { UserEntity } from '@entities/users.entity'
import { HttpException } from '@exceptions/HttpException'
import { RequestWithUser, DataStoredInToken } from '@interfaces/auth.interface'

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
      const userRepository = getRepository(UserEntity)
      const findUser = await userRepository.findOne(id, { select: ['id', 'email'] })
      return findUser
    }

    return null
  } catch (error) {
    throw new HttpException(401, 'Unauthorized')
  }
}

export const AuthCheckerMiddleware: AuthChecker<RequestWithUser> = async ({ context: { user } }) => {
  if (!user) {
    throw new HttpException(401, 'Unauthorized')
  }

  return true
}
