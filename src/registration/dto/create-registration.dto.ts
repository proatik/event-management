import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateRegistrationBodyDto {
  @ApiProperty({
    description: "ID of the event (uuid v4)",
    example: "2567f857-f8ed-47b2-afe8-919962cae311"
  })
  @IsNotEmpty()
  @IsUUID(4, { message: "eventId must be a valid uuid v4" })
  eventId: string;

  @ApiProperty({
    description: "ID of the attendee (uuid v4)",
    example: "6c1ae233-76c5-419c-b627-78be96ee7b54"
  })
  @IsNotEmpty()
  @IsUUID(4, { message: "attendeeId must be a valid uuid v4" })
  attendeeId: string;
}
