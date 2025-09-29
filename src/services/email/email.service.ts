import Brevo from "sib-api-v3-sdk"
import { BREVO_API_KEY } from "@/config"

// Interface for email options
interface EmailOptions {
  from: { email: string; name?: string }
  to: { email: string; name?: string }[]
  subject: string
  text?: string
  html?: string
}

export class EmailService {
  private emailApi: Brevo.TransactionalEmailsApi

  constructor() {
    if (!BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is not defined in environment variables")
    }

    const client = Brevo.ApiClient.instance
    const apiKey = client.authentications["api-key"]
    apiKey.apiKey = BREVO_API_KEY

    this.emailApi = new Brevo.TransactionalEmailsApi()
  }

  async sendEmail(options: EmailOptions): Promise<string | undefined> {
    try {
      const response = await this.emailApi.sendTransacEmail({
        sender: options.from,
        to: options.to,
        subject: options.subject,
        textContent: options.text,
        htmlContent: options.html,
      })

      console.log("Email sent successfully:", response.messageId)
      return response.messageId
    } catch (error) {
      console.error(
        `Failed to send email: ${
          error instanceof Error ? error.message : JSON.stringify(error)
        }`
      )
    }
  }
}