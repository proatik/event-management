import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// entity.
import { Event } from "src/event/entity/event.entity";
import { Registration } from "./entity/registration.entity";
import { Attendee } from "src/attendee/entity/attendee.entity";

// service.
import { QueueService } from "src/queue/queue.service";
import { EmailService } from "src/email/email.service";
import { RegistrationService } from "./registration.service";

// controller.
import { RegistrationController } from "./registration.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Attendee, Event, Registration])],
  controllers: [RegistrationController],
  providers: [RegistrationService, QueueService, EmailService]
})
export class RegistrationModule {}
