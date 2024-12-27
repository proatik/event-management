import {
  Get,
  Body,
  Post,
  Patch,
  Query,
  Param,
  Delete,
  Controller
} from "@nestjs/common";

import { ApiTags, ApiParam, ApiResponse, ApiOperation } from "@nestjs/swagger";

// service.
import { AttendeeService } from "./attendee.service";

// dto.
import { GetAttendeeParamDto } from "./dto/get-attendee.dto";
import { GetAttendeesQueryDto } from "./dto/get-attendees.dto";
import { CreateAttendeeBodyDto } from "./dto/create-attendee.dto";
import { UpdateAttendeeBodyDto } from "./dto/update-attendee.dto";
import { UpdateAttendeeParamDto } from "./dto/update-attendee.dto";
import { DeleteAttendeeParamDto } from "./dto/delete-attendee.dto";

@ApiTags("Attendees")
@Controller("attendees")
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  @Post()
  @ApiOperation({ summary: "Create a new attendee" })
  @ApiResponse({ status: 201, description: "Attendee created successfully" })
  @ApiResponse({ status: 400, description: "Invalid request data" })
  @ApiResponse({ status: 409, description: "Attendee already exist" })
  async createAttendee(@Body() createAttendeeDto: CreateAttendeeBodyDto) {
    return this.attendeeService.createAttendee(createAttendeeDto);
  }

  @Get()
  @ApiOperation({ summary: "Get a list of attendees" })
  @ApiResponse({ status: 200, description: "List of attendees" })
  @ApiResponse({ status: 400, description: "Invalid query parameters" })
  async getAttendees(@Query() getAttendeesDto: GetAttendeesQueryDto) {
    return this.attendeeService.getAttendees(getAttendeesDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get details of a specific attendee" })
  @ApiParam({ name: "id", type: String, description: "Attendee ID" })
  @ApiResponse({ status: 200, description: "Attendee details retrieved" })
  @ApiResponse({ status: 404, description: "Attendee not found" })
  async getAttendee(@Param() { id }: GetAttendeeParamDto) {
    return this.attendeeService.getAttendee(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an existing attendee" })
  @ApiParam({ name: "id", type: String, description: "Attendee ID" })
  @ApiResponse({ status: 200, description: "Attendee updated successfully" })
  @ApiResponse({ status: 400, description: "Invalid request data" })
  @ApiResponse({ status: 404, description: "Attendee not found" })
  async updateAttendee(
    @Param() { id }: UpdateAttendeeParamDto,
    @Body() updateAttendeeDto: UpdateAttendeeBodyDto
  ) {
    return this.attendeeService.updateAttendee(id, updateAttendeeDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an attendee" })
  @ApiParam({ name: "id", type: String, description: "Attendee ID" })
  @ApiResponse({ status: 200, description: "Attendee deleted successfully" })
  @ApiResponse({ status: 404, description: "Attendee not found" })
  async deleteAttendee(@Param() { id }: DeleteAttendeeParamDto) {
    return this.attendeeService.deleteAttendee(id);
  }
}
