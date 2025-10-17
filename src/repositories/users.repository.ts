import { hash } from 'bcrypt'
import { EntityRepository } from 'typeorm'
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto'
import { UserEntity } from '@entities/users.entity'
import { HttpException } from '@exceptions/HttpException'
import { User } from '@interfaces/users.interface'

@EntityRepository(UserEntity)
export class UserRepository {
  public async userFindAll(): Promise<User[]> {
    const users: User[] = await UserEntity.find()

    return users
  }

  public async userFindById(userId: string): Promise<User> {
    const user: User = await UserEntity.findOne({ where: { id: userId } })
    if (!user) throw new HttpException(409, "User doesn't exist")

    return user
  }

  public async userUpdate(userId: string, userData: UpdateUserDto): Promise<User> {
    const findUser: User = await UserEntity.findOne({ where: { id: userId } })
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    await UserEntity.update(userId, { ...userData })

    const updateUser: User = await UserEntity.findOne({ where: { id: userId } })
    return updateUser
  }

  public async userDelete(userId: string): Promise<User> {
    const findUser: User = await UserEntity.findOne({ where: { id: userId } })
    if (!findUser) throw new HttpException(409, "User doesn't exist")

    await UserEntity.delete({ id: userId })
    return findUser
  }
}
