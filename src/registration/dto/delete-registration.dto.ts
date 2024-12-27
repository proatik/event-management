import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeleteRegistrationParamDto {
  @ApiProperty({
    description: "ID of the registration (uuid v4)"
  })
  @IsUUID(4, { message: "registration id must be a valid uuid v4" })
  id: string;
}
