import { Authorized, Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto'
import { AuthRepository } from '@repositories/auth.repository'
import { User } from '@typedefs/users.type'
import { Response } from 'express'

@Resolver()
export class AuthResolver extends AuthRepository {
  @Mutation(() => User, {
    description: 'User signup',
  })
  async signup(@Arg('userData') userData: CreateUserDto): Promise<User> {
    const user: User = await this.userSignUp(userData)
    return user
  }

  @Mutation(() => Boolean, {
    description: 'User login',
  })
  async login(@Arg('userData') userData: LoginUserDto, @Ctx() ctx: { res: Response }): Promise<Boolean> {
    try {
      await this.userLogIn(userData, ctx.res)
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
