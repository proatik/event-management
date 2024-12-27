import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Controller
} from "@nestjs/common";

import { ApiTags, ApiParam, ApiResponse, ApiOperation } from "@nestjs/swagger";

// service.
import { EventService } from "./event.service";

// dto.
import { GetEventParamDto } from "./dto/get-event.dto";
import { GetEventsQueryDto } from "./dto/get-events.dto";
import { CreateEventBodyDto } from "./dto/create-event.dto";
import { UpdateEventBodyDto } from "./dto/update-event.dto";
import { DeleteEventParamDto } from "./dto/delete-event.dto";
import { UpdateEventParamDto } from "./dto/update-event.dto";

@ApiTags("Events")
@Controller("events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: "Create a new event" })
  @ApiResponse({ status: 201, description: "Event created successfully" })
  @ApiResponse({ status: 400, description: "Invalid request data" })
  async createEvent(@Body() createEventDto: CreateEventBodyDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: "Get a list of events" })
  @ApiResponse({ status: 200, description: "List of events" })
  @ApiResponse({ status: 400, description: "Invalid query parameters" })
  async getEvents(@Query() getEventsDto: GetEventsQueryDto) {
    return this.eventService.getEvents(getEventsDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get details of a specific event" })
  @ApiResponse({ status: 200, description: "Event details retrieved" })
  @ApiResponse({ status: 404, description: "Event not found" })
  async getEvent(@Param() { id }: GetEventParamDto) {
    return this.eventService.getEvent(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an existing event" })
  @ApiParam({ name: "id", type: String, description: "Event ID" })
  @ApiResponse({ status: 200, description: "Event updated successfully" })
  @ApiResponse({ status: 400, description: "Invalid request data" })
  @ApiResponse({ status: 404, description: "Event not found" })
  async updateEvent(
    @Param() { id }: UpdateEventParamDto,
    @Body() updateEventDto: UpdateEventBodyDto
  ) {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an event" })
  @ApiParam({ name: "id", type: String, description: "Event ID" })
  @ApiResponse({ status: 200, description: "Event deleted successfully" })
  @ApiResponse({ status: 404, description: "Event not found" })
  async deleteEvent(@Param() { id }: DeleteEventParamDto) {
    return this.eventService.deleteEvent(id);
  }
}
