import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PartialType } from "@nestjs/mapped-types";

// create attendee dto.
import { CreateAttendeeBodyDto } from "./create-attendee.dto";

export class UpdateAttendeeParamDto {
  @ApiProperty({
    description: "ID of the attendee (uuid v4)"
  })
  @IsUUID(4, { message: "attendee id must be a valid uuid v4" })
  id: string;
}

export class UpdateAttendeeBodyDto extends PartialType(CreateAttendeeBodyDto) {}
