import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetAttendeeParamDto {
  @ApiProperty({
    description: "ID of the attendee (uuid v4)"
  })
  @IsUUID(4, { message: "attendee id must be a valid uuid v4" })
  id: string;
}
