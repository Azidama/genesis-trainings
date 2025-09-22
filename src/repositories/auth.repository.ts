import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { EntityRepository } from 'typeorm'
import { BREVO_SENDER_EMAIL, FRONTEND_URL, SECRET_KEY } from '@config'
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto'
import { UserEntity } from '@entities/users.entity'
import { HttpException } from '@exceptions/HttpException'
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface'
import { User, UserInfo } from '@interfaces/users.interface'
import { Response } from 'express'
import { EmailService } from '@/services/email/email.service'

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

  public async passwordReset(email: string): Promise<Boolean> {
    const findUser: User = await UserEntity.findOne({ where: { email } })
    if (findUser) throw new HttpException(409, `This email ${email} was not found`)
    
    // send email to user with reset link
    const user = {
      id: findUser.id,
      email: findUser.email,
      name: findUser.name,
    }
    const token = createToken(user)
        const htmlBody = ``
    
        const textBody = `${FRONTEND_URL}/reset-password/${token}`
    
        const subject = 'Password Reset'
    
        const options = {
          to: [{ email: user.email, name: user.name }],
          subject,
          from: { email: BREVO_SENDER_EMAIL, name: 'Genesis Trainings' },
          html: htmlBody,
          text: textBody
        }
        const mailer = new EmailService
        mailer.sendEmail(options)

    return true
  }

  public async userSignup(userData: CreateUserDto): Promise<User> {
    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } })
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`)

    const hashedPassword = await hash(userData.password, 10)
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword }).save()

    return createUserData
  }

  public async userLogOut(userId: string): Promise<User> {
    const findUser: User = await UserEntity.findOne({ where: { id: userId } })
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    return findUser
  }
}
