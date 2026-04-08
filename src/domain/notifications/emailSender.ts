export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export interface EmailSender {
  send(options: EmailOptions): Promise<boolean>;
}
