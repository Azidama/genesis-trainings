import AWS from 'aws-sdk'
import nodemailer from 'nodemailer'
import { AWS_ACCESS_KEY, AWS_REGION, AWS_SECRET_KEY } from '@/config'

// Interface for email options
interface EmailOptions {
  from: string
  to: string
  subject: string
  text?: string
  html?: string
}

export class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY) {
      throw new Error('AWS credentials are not defined in environment variables')
    }

    // Configure AWS SDK (v2)
    AWS.config.update({
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_KEY,
      region: AWS_REGION || 'us-east-1',
    })

    // Create Nodemailer transporter with AWS SES
    this.transporter = nodemailer.createTransport({
      SES: new AWS.SES({ apiVersion: '2010-12-01' }),
    })
  }

  async sendEmail(options: EmailOptions): Promise<string> {
    try {
      const info = await this.transporter.sendMail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      })

      console.log('Message sent: %s', info.messageId)
      return info.messageId
    } catch (error) {
      console.error('Error sending message:', error)
      throw new Error(
        `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
    }
  }
}