import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsUUID, IsInt, Min } from "class-validator";

export class GetRegistrationsParamDto {
  @ApiProperty({
    description: "ID of the event (uuid v4)"
  })
  @IsUUID(4, { message: "eventId must be a valid uuid v4" })
  eventId: string;
}

export class GetRegistrationsQueryDto {
  @ApiPropertyOptional({
    description: "Filter registrations by attendee ID (uuid v4)",
    required: false
  })
  @IsOptional()
  @IsUUID(4, { message: "attendeeId must be a valid uuid v4" })
  attendeeId?: string;

  @ApiPropertyOptional({
    description: "The maximum number of registrations to return per page",
    example: 10,
    required: false
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: "The page number for pagination",
    example: 1,
    required: false
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;
}
