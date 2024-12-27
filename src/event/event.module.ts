import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// entity.
import { Event } from "./entity/event.entity";

// service.
import { EventService } from "./event.service";

// controller.
import { EventController } from "./event.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService]
})
export class EventModule {}
