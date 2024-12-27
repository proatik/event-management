import { Module } from "@nestjs/common";

// module.
import { CronModule } from "./cron/cron.module";
import { QueueModule } from "./queue/queue.module";
import { EmailModule } from "./email/email.module";
import { EventModule } from "./event/event.module";
import { CacheModule } from "./cache/cache.module";
import { AppConfigModule } from "./config/config.module";
import { AttendeeModule } from "./attendee/attendee.module";
import { DatabaseModule } from "./database/database.module";
import { RegistrationModule } from "./registration/registration.module";

@Module({
  imports: [
    CronModule,
    EmailModule,
    CacheModule,
    QueueModule,
    EventModule,
    DatabaseModule,
    AttendeeModule,
    AppConfigModule,
    RegistrationModule
  ]
})
export class AppModule {}
