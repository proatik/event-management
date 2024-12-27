import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport, Transporter } from "nodemailer";

// type.
import { EmailData } from "./type";

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>("SMTP_HOST");
    const port = this.configService.get<number>("SMTP_PORT");
    const user = this.configService.get<string>("SMTP_USER");
    const pass = this.configService.get<string>("SMTP_PASSWORD");

    this.transporter = createTransport({
      host,
      port,
      secure: false,
      auth: { user, pass }
    });
  }

  async sendEmail(emailData: EmailData) {
    return await this.transporter.sendMail(emailData);
  }
}
