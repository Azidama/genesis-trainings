import { hash } from 'bcrypt'
import { EntityRepository } from 'typeorm'
// import { CreateRegistrationDto, UpdateRegistrationDto } from '@dtos/registrations.dto'
import { HttpException } from '@exceptions/HttpException'
import { RegistrationEntity } from '@/entities/registrations.entity'
import { Registration } from '@/interfaces/registrations.interface'
import { CreateRegistrationDto } from '@/dtos/registrations.dto'
import { EmailService } from '@/services/email/email.service'
// import { AWS_SENDER_EMAIL } from '@/config'
import { registrationConfirmationEmail } from '@/utils/htmlTemplates'
import { BREVO_SENDER_EMAIL } from '@/config'

@EntityRepository(RegistrationEntity)
export class RegistrationRepository {
  // public async registrationFindAll(): Promise<Registration[]> {
  //   const registrations: Registration[] = await RegistrationEntity.find()

  //   return registrations
  // }

  // public async registrationFindById(registrationId: string): Promise<Registration> {
  //   const registration: Registration = await RegistrationEntity.findOne({ where: { id: registrationId } })
  //   if (!registration) throw new HttpException(409, "Registration doesn't exist")

  //   return registration
  // }

  public async registrationCreate(registrationData: CreateRegistrationDto): Promise<Registration> {
    const findRegistration: Registration = await RegistrationEntity.findOne({ where: { email: registrationData.email } })
    if (findRegistration) throw new HttpException(409, `This email ${registrationData.email} already exists`)

    const registeredApplication: Registration = await RegistrationEntity.create({ ...registrationData }).save()

    const htmlBody = `
      <html>
        <body>
          <h2>Welcome ${registrationData.name}!</h2>
          <p>Thank you for registering at Genesis Trainings.</p>
        </body>
      </html>
    `

    const textBody = `
      Welcome ${registrationData.name}!
      Your response has been recorded successfully.
      Our team will reach out to you soon.
    `

    const subject = 'Registration Notification'

    const options = {
      to: [{ email: registrationData.email, name: registrationData.name }],
      subject,
      from: { email: BREVO_SENDER_EMAIL, name: 'Genesis Trainings' },
      html: registrationConfirmationEmail,
      text: textBody
    }
    const mailer = new EmailService
    mailer.sendEmail(options)

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

  // public async registrationDelete(registrationId: string): Promise<Registration> {
  //   const findRegistration: Registration = await RegistrationEntity.findOne({ where: { id: registrationId } })
  //   if (!findRegistration) throw new HttpException(409, "Registration doesn't exist")

  //   await RegistrationEntity.delete({ id: registrationId })
  //   return findRegistration
  // }
}
