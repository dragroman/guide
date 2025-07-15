import nodemailer from "nodemailer"

class EmailService {
  public transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async sendOtpEmail(
    email: string,
    otpCode: string,
    isResend = false
  ): Promise<void> {
    const subject = isResend
      ? "Новый код подтверждения регистрации"
      : "Код подтверждения регистрации"

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Код подтверждения регистрации</h2>
        <p>Ваш код подтверждения:</p>
        <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${otpCode}
        </div>
        <p style="color: #666;">
          Код действителен в течение 10 минут.<br>
          Если вы не запрашивали регистрацию, просто проигнорируйте это письмо.
        </p>
        ${isResend ? '<p style="color: #f39c12;"><strong>Это повторно отправленный код.</strong></p>' : ""}
      </div>
    `

    await this.transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: email,
      subject,
      html: htmlContent,
    })
  }
}

export const emailService = new EmailService()
