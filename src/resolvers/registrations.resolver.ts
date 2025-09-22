import { Arg, Mutation, Query, Resolver } from 'type-graphql'
// import { CreateRegistrationDto, UpdateRegistrationDto } from '@dtos/registrations.dto'
import { RegistrationRepository } from '@/repositories/registrations.repository'
import { Registration } from '@/typedefs/registration.type'
import { CreateRegistrationDto } from '@/dtos/registrations.dto'

@Resolver()
export class RegistrationResolver extends RegistrationRepository {
  // @Query(() => [Registration], {
  //   description: 'Registration find list',
  // })
  // async getRegistrations(): Promise<Registration[]> {
  //   const registrations: Registration[] = await this.registrationFindAll()
  //   return registrations
  // }

  // @Query(() => Registration, {
  //   description: 'Registration find by id',
  // })
  // async getRegistrationById(@Arg('registrationId') registrationId: string): Promise<Registration> {
  //   const registration: Registration = await this.registrationFindById(registrationId)
  //   return registration
  // }

  @Mutation(() => Registration, {
    description: 'Registration create',
  })
  async createRegistration(@Arg('registrationData') registrationData: CreateRegistrationDto): Promise<Registration> {
    const registration: Registration = await this.registrationCreate(registrationData)
    return registration
  }

  // @Mutation(() => Registration, {
  //   description: 'Registration update',
  // })
  // async updateRegistration(@Arg('registrationId') registrationId: string, @Arg('registrationData') registrationData: UpdateRegistrationDto): Promise<Registration> {
  //   const registration: Registration = await this.registrationUpdate(registrationId, registrationData)
  //   return registration
  // }

  // @Mutation(() => Registration, {
  //   description: 'Registration delete',
  // })
  // async deleteRegistration(@Arg('registrationId') registrationId: string): Promise<Registration> {
  //   const registration: Registration = await this.registrationDelete(registrationId)
  //   return registration
  // }
}
