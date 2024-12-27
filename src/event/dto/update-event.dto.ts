import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from "@nestjs/mapped-types";

// create event dto.
import { CreateEventBodyDto } from "./create-event.dto";

export class UpdateEventParamDto {
  @ApiProperty({
    description: "ID of the event (uuid v4)"
  })
  @IsUUID(4, { message: "event id must be a valid uuid v4" })
  id: string;
}

export class UpdateEventBodyDto extends PartialType(CreateEventBodyDto) {}
