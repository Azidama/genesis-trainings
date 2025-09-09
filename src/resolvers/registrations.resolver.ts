import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto'
import { RegistrationRepository } from '@/repositories/registrations.repository'
import { Registration } from '@/typedefs/registration.type'
import { CreateRegistrationDto } from '@/dtos/registrations.dto'

@Resolver()
export class RegistrationResolver extends RegistrationRepository {
  @Query(() => [Registration], {
    description: 'Registration find list',
  })
  async getUsers(): Promise<Registration[]> {
    const users: Registration[] = await this.userFindAll()
    return users
  }

  @Query(() => Registration, {
    description: 'Registration find by id',
  })
  async getUserById(@Arg('userId') userId: string): Promise<Registration> {
    const user: Registration = await this.userFindById(userId)
    return user
  }

  @Mutation(() => Registration, {
    description: 'Registration create',
  })
  async createRegistration(@Arg('registrationData') registrationData: CreateRegistrationDto): Promise<Registration> {
    const registration: Registration = await this.registrationCreate(registrationData)
    return registration
  }

  @Mutation(() => Registration, {
    description: 'Registration update',
  })
  async updateUser(@Arg('userId') userId: string, @Arg('userData') userData: UpdateUserDto): Promise<Registration> {
    const user: Registration = await this.userUpdate(userId, userData)
    return user
  }

  @Mutation(() => Registration, {
    description: 'Registration delete',
  })
  async deleteUser(@Arg('userId') userId: string): Promise<Registration> {
    const user: Registration = await this.userDelete(userId)
    return user
  }
}
