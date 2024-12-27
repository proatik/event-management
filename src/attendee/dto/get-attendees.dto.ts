import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Min, IsInt, IsOptional, IsString } from "class-validator";

export class GetAttendeesQueryDto {
  @ApiPropertyOptional({
    description: "Search attendees by name",
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: "Search attendees by email",
    required: false
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    description: "The maximum number of attendees to return per page",
    required: false
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: "The page number for pagination",
    required: false
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;
}
