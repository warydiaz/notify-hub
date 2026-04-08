import nodemailer from 'nodemailer';
import type { EmailSender, EmailOptions } from '../../domain/notifications/emailSender.js';

export class NodemailerEmailSender implements EmailSender {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async send(options: EmailOptions): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      return true;
    } catch (err) {
      console.error('[Email] Error al enviar:', err);
      return false;
    }
  }
}
