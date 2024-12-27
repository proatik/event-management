import { Module } from "@nestjs/common";

// service.
import { EmailService } from "./email.service";

@Module({
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
