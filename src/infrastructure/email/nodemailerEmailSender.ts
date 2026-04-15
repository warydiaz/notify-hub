import nodemailer from 'nodemailer';
import type { EmailSender, EmailOptions } from '../../domain/notifications/emailSender.js';

export interface NodemailerEmailSenderConfig {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  emailFrom: string;
}

export class NodemailerEmailSender implements EmailSender {
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: NodemailerEmailSenderConfig) {
    this.transporter = nodemailer.createTransport({
      host: this.config.smtpHost!,
      port: this.config.smtpPort!,
      auth: {
        user: this.config.smtpUser!,
        pass: this.config.smtpPass!,
      },
    });
  }

  async send(userId:string, data: EmailOptions): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: this.config.emailFrom,
        to: data.to,
        subject: data.subject,
        html: data.html,
      });
      return true;
    } catch (err) {
      console.error('[Email] Error al enviar:', err);
      return false;
    }
  }
}
