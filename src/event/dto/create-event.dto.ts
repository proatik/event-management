import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

// custom validator.
import {
  DateValidation,
  MaxAttendeesValidation
} from "../decorator/validation.decorator";

export class CreateEventBodyDto {
  @ApiProperty({
    description: "The name of the event",
    example: "Tech Conference 2025"
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "A description of the event",
    example: "A conference for tech enthusiasts",
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    description: "The date and time of the event",
    example: "2025-01-04T09:00:00Z"
  })
  @DateValidation()
  date: string;

  @ApiProperty({
    description: "The location of the event",
    example: "Dhaka, Bangladesh",
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location?: string;

  @ApiProperty({
    description: "The maximum number of attendees for the event",
    example: 100
  })
  @Type(() => Number)
  @MaxAttendeesValidation()
  maxAttendees: number;
}
