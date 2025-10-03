import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { RegistrationRepository } from '@/repositories/registrations.repository'
import { RegistrationsPage, Registration } from '@/typedefs/registration.type'
import { CreateRegistrationDto, GetRegistrationDto } from '@/dtos/registrations.dto'
import { RegistrationListResult } from '@/interfaces/registrations.interface'

@Resolver()
export class RegistrationResolver extends RegistrationRepository {
  @Authorized('Admin')
  @Query(() => RegistrationsPage, {
    description: 'Registration find list',
  })
  async getRegistrations(
    @Arg('registrationFilters') registrationFilters: GetRegistrationDto
  ): Promise<RegistrationListResult> {
    const data: RegistrationListResult = await this.registrationFindAll(
      registrationFilters.page,
      registrationFilters.limit,
      registrationFilters.deleted,
      registrationFilters.approved,
      registrationFilters.searchFilter
    )
    return data
  }

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

  @Mutation(() => Registration, {
    description: 'Registration update approved flag',
  })
  async markRegistrationApproved(@Arg('registrationId') registrationId: string): Promise<Registration> {
    const registration: Registration = await this.registrationMarkApproved(registrationId)
    return registration
  }

  @Mutation(() => Registration, {
    description: 'Registration delete',
  })
  async deleteRegistration(@Arg('registrationId') registrationId: string): Promise<Registration> {
    const registration: Registration = await this.registrationDelete(registrationId)
    return registration
  }

  @Mutation(() => Registration, {
    description: 'Registration reset',
  })
  async resetRegistration(@Arg('registrationId') registrationId: string): Promise<Registration> {
    const registration: Registration = await this.registrationReset(registrationId)
    return registration
  }
}
