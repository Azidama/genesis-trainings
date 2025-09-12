import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { EntityRepository } from 'typeorm'
import { SECRET_KEY } from '@config'
import { LoginUserDto } from '@dtos/users.dto'
import { UserEntity } from '@entities/users.entity'
import { HttpException } from '@exceptions/HttpException'
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface'
import { User, UserInfo } from '@interfaces/users.interface'
import { Response } from 'express'

const expiresIn: number = 86400 * 1000
const createToken = (user: UserInfo): String => {
  const dataStoredInToken: DataStoredInToken = {
    user,
  }

  return sign(dataStoredInToken, SECRET_KEY, { expiresIn })
}

// old cookie code, might bring it back if needed
const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; sameSite: 'None'; httpOnly; Max-Age=${tokenData.expiresIn};`
}

@EntityRepository(UserEntity)
export class AuthRepository {
  public async userLogIn(userData: LoginUserDto, res: Response): Promise<Boolean> {
    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } })
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`)

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password)
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching')

    const user = {
      id: findUser.id,
      email: findUser.email,
      name: findUser.name,
    }
    const token = createToken(user)
    res.cookie('Authorization', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: expiresIn,
    })

    return true
  }

  public async userLogOut(userId: string): Promise<User> {
    const findUser: User = await UserEntity.findOne({ where: { id: userId } })
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    return findUser
  }
}
