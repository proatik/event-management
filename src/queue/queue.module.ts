import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";

// module.
import { EmailModule } from "src/email/email.module";

// service.
import { QueueService } from "./queue.service";
import { EmailService } from "src/email/email.service";

@Module({
  imports: [ScheduleModule.forRoot(), EmailModule],
  providers: [QueueService, EmailService],
  exports: [QueueService]
})
export class QueueModule {}
