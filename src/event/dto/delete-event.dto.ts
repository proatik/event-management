import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeleteEventParamDto {
  @ApiProperty({
    description: "ID of the event (uuid v4)"
  })
  @IsUUID(4, { message: "event id must be a valid uuid v4" })
  id: string;
}
