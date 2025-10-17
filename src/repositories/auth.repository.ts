import { compare, hash } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { EntityRepository } from 'typeorm'
import { BREVO_SENDER_EMAIL, FRONTEND_URL, SECRET_KEY } from '@config'
import { CreateUserDto, LoginUserDto, ResetPasswordDto } from '@dtos/users.dto'
import { UserEntity } from '@entities/users.entity'
import { HttpException } from '@exceptions/HttpException'
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface'
import { User, UserInfo } from '@interfaces/users.interface'
import { Response } from 'express'
import { EmailService } from '@/services/email/email.service'
import { RegistrationEntity } from '@/entities/registrations.entity'
import { AuthenticationError } from 'apollo-server-core'
import { resetPasswordEmail, userSignupTemplate } from '@/utils/htmlTemplates'

const createToken = (user: UserInfo, expiresIn: number): String => {
  const dataStoredInToken: DataStoredInToken = {
    user
  }

  return sign(dataStoredInToken, SECRET_KEY, { expiresIn })
}

// old cookie code, might bring it back if needed
const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; sameSite: 'None'; httpOnly; Max-Age=${tokenData.expiresIn};`
}

@EntityRepository(UserEntity)
export class AuthRepository {
  public async userLogIn(userData: LoginUserDto, res: Response): Promise<String> {
    const findUser: User = await UserEntity.findOne({ where: { email: userData.email } })
    if (!findUser) throw new HttpException(409, `The email ${userData.email} was not found`)

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password)
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching')

    const user = {
      id: findUser.id,
      email: findUser.email,
      name: findUser.name,
      role: findUser.role
    }
    const expiresIn: number = 86400
    const token = createToken(user, expiresIn)
    res.cookie('Authorization', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: expiresIn * 1000,
    })

    return token
  }

  public async passwordForgot(email: string): Promise<Boolean> {
    const findUser: User = await UserEntity.findOne({ where: { email } })
    if (!findUser) throw new HttpException(409, `The email ${email} was not found`)
    
    // Create reset link and send email
    const user = {
      id: findUser.id,
      email: findUser.email,
      name: findUser.name,
      role: findUser.role
    }
    const expiresIn: number = 3600
    const token = createToken(user, expiresIn)

    const resetURL = `${FRONTEND_URL}/reset-password/?token=${token}`
    const subject = 'Password Reset'

    const options = {
      to: [{ email: user.email, name: user.name }],
      subject,
      from: { email: BREVO_SENDER_EMAIL, name: 'Genesis Trainings' },
      html: resetPasswordEmail({ resetURL })
    }
    const mailer = new EmailService
    mailer.sendEmail(options)

    return true
  }

  public async passwordReset(data: ResetPasswordDto): Promise<Boolean> {
    try {
      const { user } = verify(data.token, SECRET_KEY) as DataStoredInToken
      const findUser: User = await UserEntity.findOne({ where: { email: user.email } })
      if (!findUser || !user.email) throw new HttpException(409, `The email ${user.email} was not found`)
      let password = data.password

      UserEntity.update({ email: user.email }, { password })
      return true
    } catch (error) {
      throw new AuthenticationError(`INVALID TOKEN OR EMAIL: ${error}`)
    }
  }

  public async userSignup(userData: CreateUserDto): Promise<User> {
    try {
      const findUser: User = await UserEntity.findOne({ where: { email: userData.email } })
      if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`)
  
      const createUserData: User = await UserEntity.create({ ...userData, password: userData.password }).save()

      const mailer = new EmailService
      const subject = 'Account Signup Notification'
  
      const userSignupOptions = {
        to: [{ email: userData.email, name: userData.name }],
        subject,
        from: { email: BREVO_SENDER_EMAIL, name: 'Genesis Trainings' },
        html: userSignupTemplate({
          name: userData.name
        })
      }
      mailer.sendEmail(userSignupOptions)
      
      return createUserData
    } catch (error) {
      throw new HttpException(409, 'Error during account creation')
    }
  }

  public async userLogOut(userId: string): Promise<User> {
    const findUser: User = await UserEntity.findOne({ where: { id: userId } })
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    return findUser
  }
}
