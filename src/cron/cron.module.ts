import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScheduleModule } from "@nestjs/schedule";

// entity.
import { Event } from "src/event/entity/event.entity";
import { Registration } from "src/registration/entity/registration.entity";

// module.
import { QueueModule } from "src/queue/queue.module";

// service.
import { CronService } from "./cron.service";
import { EmailService } from "src/email/email.service";

@Module({
  imports: [
    QueueModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Event, Registration])
  ],
  providers: [CronService, EmailService],
  exports: [CronService]
})
export class CronModule {}
