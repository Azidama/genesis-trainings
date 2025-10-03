import { EntityRepository, ILike, IsNull, Like, Not } from 'typeorm'
// import { CreateRegistrationDto, UpdateRegistrationDto } from '@dtos/registrations.dto'
import { HttpException } from '@exceptions/HttpException'
import { RegistrationEntity } from '@/entities/registrations.entity'
import { Registration, RegistrationListResult } from '@/interfaces/registrations.interface'
import { CreateRegistrationDto } from '@/dtos/registrations.dto'
import { EmailService } from '@/services/email/email.service'
import { registrationConfirmationEmail, registrationNotificationForStaff } from '@/utils/htmlTemplates'
import { BREVO_SENDER_EMAIL, STAFF_EMAIL } from '@/config'

@EntityRepository(RegistrationEntity)
export class RegistrationRepository {
  public async registrationFindAll(
    page: number,
    limit: number,
    deleted?: boolean,
    approved?: boolean,
    searchFilter?: string
  ): Promise<RegistrationListResult> {
  
    const take = limit && limit > 0 ? limit : 10
    const skip = page && page > 0 ? (page - 1) * take : 0
  
    let where: any = {}
    if (deleted) {
      where.deletedAt = Not(IsNull())
    } else {
      where.deletedAt = IsNull()
    }
    
    if (approved === true) {
      where.approved = true
    } else if (deleted === false) {
      where.approved = false
    }

    if (searchFilter) {
      where = [
        { ...where, email: ILike(`%${searchFilter}%`) },
        { ...where, name: ILike(`%${searchFilter}%`) }
      ]
    }
  
    const [registrations, count] = await RegistrationEntity.findAndCount({
      where,
      skip,
      take,
      order: { createdAt: "DESC" },
      withDeleted: !!deleted
    })
  
    return {
      registrations,
      count,
      page: page ?? 1,
      totalPages: Math.ceil(count / take) ?? 0
    }
  }
  

  // public async registrationFindById(registrationId: string): Promise<Registration> {
  //   const registration: Registration = await RegistrationEntity.findOne({ where: { id: registrationId } })
  //   if (!registration) throw new HttpException(409, "Registration doesn't exist")

  //   return registration
  // }

  public async registrationCreate(registrationData: CreateRegistrationDto): Promise<Registration> {
    const findRegistration: Registration = await RegistrationEntity.findOne({ where: { email: registrationData.email } })
    if (findRegistration) throw new HttpException(409, `This email ${registrationData.email} already exists`)

    const registeredApplication: Registration = await RegistrationEntity.create({ ...registrationData }).save()

    const mailer = new EmailService
    const subject = 'Registration Notification'

    const customerRegistrationOptions = {
      to: [{ email: registrationData.email, name: registrationData.name }],
      subject,
      from: { email: BREVO_SENDER_EMAIL, name: 'Genesis Trainings' },
      html: registrationConfirmationEmail({
        name: registrationData.name
      })
    }
    mailer.sendEmail(customerRegistrationOptions)
    
    const staffNotificationOptions = {
      to: [{ email: STAFF_EMAIL, name: 'Genesis Trainings Staff' }],
      subject,
      from: { email: BREVO_SENDER_EMAIL, name: 'Genesis Trainings' },
      html: registrationNotificationForStaff({
        name: registrationData.name,
        email: registrationData.email
      })
    }
    mailer.sendEmail(staffNotificationOptions)

    return registeredApplication
  }

  // public async registrationUpdate(registrationId: string, registrationData: UpdateRegistrationDto): Promise<Registration> {
  //   const findRegistration: Registration = await RegistrationEntity.findOne({ where: { id: registrationId } })
  //   if (!findRegistration) throw new HttpException(409, "Registration doesn't exist")

  //   if (registrationData.password) {
  //     const hashedPassword = await hash(registrationData.password, 10)
  //     registrationData.password = hashedPassword
  //   }
  //   await RegistrationEntity.update(registrationId, { ...registrationData })

  //   const updateRegistration: Registration = await RegistrationEntity.findOne({ where: { id: registrationId } })
  //   return updateRegistration
  // }

  public async registrationMarkApproved(registrationId: string): Promise<Registration> {
    const findRegistration: Registration = await RegistrationEntity.findOne({ where: { id: registrationId }})
    if (!findRegistration || findRegistration.deletedAt) throw new HttpException(409, "Registration doesn't exist")

    await RegistrationEntity.update({ id: registrationId }, { approved: true })
    return findRegistration
  }

  public async registrationDelete(registrationId: string): Promise<Registration> {
    const findRegistration: Registration = await RegistrationEntity.findOne({ where: { id: registrationId } })
    if (!findRegistration) throw new HttpException(409, "Registration doesn't exist")
    if (findRegistration.approved) throw new HttpException(409, "Registration is marked as approved, mark as unapproved to delete!")

    await RegistrationEntity.update({ id: registrationId }, { deletedAt: new Date() })
    return findRegistration
  }

  public async registrationReset(registrationId: string): Promise<Registration> {
    const findRegistration: Registration = await RegistrationEntity.findOne({
       where: { id: registrationId },
       withDeleted: true
      })
    if (!findRegistration) throw new HttpException(409, "Registration doesn't exist")

    try {
      if (findRegistration.deletedAt) {
        await RegistrationEntity.update({ id: registrationId }, { deletedAt: null })
      }
      if (findRegistration.approved) {
        await RegistrationEntity.update({ id: registrationId }, { approved: false })
      }
      return findRegistration
    } catch (error) {
      throw new HttpException(409, `Registration reset failed: ${error}`)
    }

  }
}
