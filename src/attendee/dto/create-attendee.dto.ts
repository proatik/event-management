import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateAttendeeBodyDto {
  @ApiProperty({
    description: "The name of the attendee",
    example: "Atik Ullah Khan"
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "The email of the attendee",
    example: "proatik@gmail.com"
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
