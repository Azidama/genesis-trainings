import { hash } from 'bcrypt'
import { EntityRepository } from 'typeorm'
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto'
import { HttpException } from '@exceptions/HttpException'
import { RegistrationEntity } from '@/entities/registrations.entity'
import { Registration } from '@/interfaces/registrations.interface'
import { CreateRegistrationDto } from '@/dtos/registrations.dto'
import { EmailService } from '@/services/email.service'
import { AWS_SENDER_EMAIL } from '@/config'

@EntityRepository(RegistrationEntity)
export class RegistrationRepository {
  public async userFindAll(): Promise<Registration[]> {
    const users: Registration[] = await RegistrationEntity.find()

    return users
  }

  public async userFindById(userId: string): Promise<Registration> {
    const user: Registration = await RegistrationEntity.findOne({ where: { id: userId } })
    if (!user) throw new HttpException(409, "Registration doesn't exist")

    return user
  }

  public async registrationCreate(registrationData: CreateRegistrationDto): Promise<Registration> {
    const findUser: Registration = await RegistrationEntity.findOne({ where: { email: registrationData.email } })
    if (findUser) throw new HttpException(409, `This email ${registrationData.email} already exists`)

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
      to: registrationData.email,
      subject,
      from: AWS_SENDER_EMAIL,
      html: htmlBody,
      text: textBody
    }
    const mailer = new EmailService
    mailer.sendEmail(options)

    return registeredApplication
  }

  public async userUpdate(userId: string, userData: UpdateUserDto): Promise<Registration> {
    const findUser: Registration = await RegistrationEntity.findOne({ where: { id: userId } })
    if (!findUser) throw new HttpException(409, "Registration doesn't exist")

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10)
      userData.password = hashedPassword
    }
    await RegistrationEntity.update(userId, { ...userData })

    const updateUser: Registration = await RegistrationEntity.findOne({ where: { id: userId } })
    return updateUser
  }

  public async userDelete(userId: string): Promise<Registration> {
    const findUser: Registration = await RegistrationEntity.findOne({ where: { id: userId } })
    if (!findUser) throw new HttpException(409, "Registration doesn't exist")

    await RegistrationEntity.delete({ id: userId })
    return findUser
  }
}
