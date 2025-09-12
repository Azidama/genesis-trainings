import nodemailer from 'nodemailer'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import 'dotenv/config'

// Interface for email options
interface EmailOptions {
  from: string
  to: string
  subject: string
  text: string
  html: string
}

// Interface for SES configuration
interface SESConfig {
  region: string
  credentials: {
    accessKeyId: string
    secretAccessKey: string
  }
}

export class EmailService {
  private sesClient: SESClient
  private transporter: nodemailer.Transporter

  constructor() {
    // Validate environment variables
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error('AWS credentials are not defined in environment variables')
    }

    // 1. Configure AWS SES client
    const sesConfig: SESConfig = {
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    }

    this.sesClient = new SESClient(sesConfig)

    // 2. Create Nodemailer transporter using SES
    this.transporter = nodemailer.createTransport({
      SES: {
        ses: this.sesClient,
        aws: { SESClient },
      },
    })
  }

  // Method to send email
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
      throw new Error(`Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
