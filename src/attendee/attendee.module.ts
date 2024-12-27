import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// entity.
import { Attendee } from "./entity/attendee.entity";

// service.
import { AttendeeService } from "./attendee.service";

// controller.
import { AttendeeController } from "./attendee.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Attendee])],
  controllers: [AttendeeController],
  providers: [AttendeeService],
  exports: [AttendeeService]
})
export class AttendeeModule {}
