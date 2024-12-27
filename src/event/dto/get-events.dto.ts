import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, Min, IsDate, IsOptional } from "class-validator";

export class GetEventsQueryDto {
  @ApiPropertyOptional({
    description: "The start date for filtering events",
    example: "2024-05-15T09:00:00Z"
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  startDate?: Date;

  @ApiPropertyOptional({
    description: "The end date for filtering events",
    example: "2024-05-16T17:00:00Z"
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  endDate?: Date;

  @ApiPropertyOptional({
    description: "The maximum number of events to return per page",
    example: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    description: "The page number for pagination",
    example: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;
}
