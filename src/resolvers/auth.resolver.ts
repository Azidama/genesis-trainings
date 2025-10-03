import { Authorized, Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { CreateUserDto, LoginUserDto, ResetPasswordDto } from '@dtos/users.dto'
import { AuthRepository } from '@repositories/auth.repository'
import { User } from '@typedefs/users.type'
import { Response } from 'express'

@Resolver()
export class AuthResolver extends AuthRepository {
  @Mutation(() => User, {
    description: 'User signup',
  })
  async signup(@Arg('userData') userData: CreateUserDto): Promise<User> {
    const user: User = await this.userSignup(userData)
    return user
  }

  @Mutation(() => String, {
    description: 'User login',
  })
  async login(@Arg('userData') userData: LoginUserDto, @Ctx() ctx: { res: Response }): Promise<String> {
    try {
      const token = await this.userLogIn(userData, ctx.res)
      return token
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => Boolean, {
    description: 'User Forgot Password',
  })
  async forgotPassword(@Arg('email') email: string): Promise<Boolean> {
    try {
      await this.passwordForgot(email)
      return true
    } catch (error) {
      throw error
    }
  }

  @Mutation(() => Boolean, {
    description: 'User Reset Password',
  })
  async resetPassword(@Arg('data') data: ResetPasswordDto): Promise<Boolean> {
    try {
      await this.passwordReset(data)
      return true
    } catch (error) {
      throw error
    }
  }

  @Authorized()
  @Mutation(() => User, {
    description: 'User logout',
  })
  async logout(@Ctx('user') userData: any): Promise<User> {
    const user = await this.userLogOut(userData)
    return user
  }
}
