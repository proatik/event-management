import {
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Controller
} from "@nestjs/common";

import { ApiTags, ApiParam, ApiResponse, ApiOperation } from "@nestjs/swagger";

// service.
import { RegistrationService } from "./registration.service";

// dto.
import { GetRegistrationsParamDto } from "./dto/get-registrations.dto";
import { GetRegistrationsQueryDto } from "./dto/get-registrations.dto";
import { CreateRegistrationBodyDto } from "./dto/create-registration.dto";
import { DeleteRegistrationParamDto } from "./dto/delete-registration.dto";

@ApiTags("Registrations")
@Controller("registrations")
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  @ApiOperation({ summary: "Create a new registration" })
  @ApiResponse({
    status: 201,
    description: "Registration created successfully"
  })
  @ApiResponse({ status: 400, description: "Invalid request data" })
  @ApiResponse({ status: 409, description: "Registration already exist" })
  async createRegistration(
    @Body() createRegistrationDto: CreateRegistrationBodyDto
  ) {
    return this.registrationService.createRegistration(createRegistrationDto);
  }

  @Get(":eventId")
  @ApiOperation({ summary: "Get all registrations of a specific event" })
  @ApiResponse({ status: 200, description: "List of registrations" })
  @ApiResponse({ status: 400, description: "Invalid query parameters" })
  async getRegistrations(
    @Param() { eventId }: GetRegistrationsParamDto,
    @Query() queryDto: GetRegistrationsQueryDto
  ) {
    return this.registrationService.getRegistrations(eventId, queryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a registration" })
  @ApiParam({ name: "id", type: String, description: "Registration ID" })
  @ApiResponse({
    status: 200,
    description: "Registration deleted successfully"
  })
  @ApiResponse({ status: 404, description: "Registration not found" })
  async deleteRegistration(@Param() { id }: DeleteRegistrationParamDto) {
    return this.registrationService.deleteRegistration(id);
  }
}
