import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Injectable,
  NotFoundException,
  BadRequestException
} from "@nestjs/common";

// type.
import { EmailData } from "src/email/type";
import { GetRegistrationsResponse } from "./type";

// entity.
import { Event } from "src/event/entity/event.entity";
import { Registration } from "./entity/registration.entity";
import { Attendee } from "src/attendee/entity/attendee.entity";

// service.
import { QueueService } from "src/queue/queue.service";
import { CacheService } from "src/cache/cache.service";

// dto.
import { GetRegistrationsQueryDto } from "./dto/get-registrations.dto";
import { CreateRegistrationBodyDto } from "./dto/create-registration.dto";

// utility function.
import { getDatePart } from "src/util/date";
import { prepareConfirmationEmail } from "src/email/template/registrationConfirmation";

@Injectable()
export class RegistrationService {
  constructor(
    private readonly queueService: QueueService,
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>,

    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>
  ) {}

  // create a registration.
  async createRegistration(
    createRegistrationDto: CreateRegistrationBodyDto
  ): Promise<Registration> {
    const { eventId, attendeeId } = createRegistrationDto;

    const event = await this.eventRepository.findOneBy({ id: eventId });

    if (!event) {
      throw new NotFoundException("event with given id doesn't exist");
    }

    const attendee = await this.attendeeRepository.findOneBy({
      id: attendeeId
    });

    if (!attendee) {
      throw new NotFoundException("attendee with given id doesn't exist");
    }

    const existingRegistration = await this.registrationRepository.findOne({
      where: { event: { id: eventId }, attendee: { id: attendeeId } }
    });

    if (existingRegistration) {
      throw new BadRequestException(
        "attendee is already registered for this event"
      );
    }

    const totalRegistrations = await this.registrationRepository.count({
      where: { event: { id: eventId } }
    });

    if (totalRegistrations >= event.maxAttendees) {
      throw new BadRequestException("event has reached its maximum capacity");
    }

    const registration = this.registrationRepository.create({
      event,
      attendee
    });

    const response = await this.registrationRepository.save(registration);

    const data = {
      email: attendee.email,
      event: event.name,
      attendee: attendee.name,
      date: getDatePart(event.date)
    };

    await this.sendConfirmationEmail(data);

    return response;
  }

  // get registrations with search and pagination.
  async getRegistrations(
    eventId: string,
    getRegistrationDto: GetRegistrationsQueryDto
  ): Promise<GetRegistrationsResponse> {
    const { attendeeId, page = 1, limit = 10 } = getRegistrationDto;

    const cacheKey = this.generateCacheKey({
      page,
      limit,
      eventId,
      attendeeId
    });

    const cachedValue = await this.cacheService.get(cacheKey);

    if (cachedValue) {
      return cachedValue;
    }

    const query = this.registrationRepository
      .createQueryBuilder("registration")
      .leftJoinAndSelect("registration.event", "event")
      .leftJoinAndSelect("registration.attendee", "attendee");

    if (eventId) {
      query.andWhere("event.id = :eventId", { eventId });
    }

    if (attendeeId) {
      query.andWhere("attendee.id = :attendeeId", { attendeeId });
    }

    const [registrations, totalRegistrations] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const response: GetRegistrationsResponse = {
      registrations,
      totalRegistrations
    };

    if (totalRegistrations > 0) {
      response.limit = limit;
      response.currentPage = page;
      response.totalPages = Math.ceil(totalRegistrations / limit);
    }

    await this.cacheService.set(cacheKey, response);

    return response;
  }

  // delete registration by id.
  async deleteRegistration(id: string): Promise<void> {
    const result = await this.registrationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException("registration with given id doesn't exist");
    }
  }

  // send confirmation email.
  async sendConfirmationEmail({
    date,
    email,
    event,
    attendee
  }: {
    date: string;
    email: string;
    event: string;
    attendee: string;
  }): Promise<void> {
    const emailFrom = this.configService.get<string>("EMAIL_FROM");
    const emailHTML = prepareConfirmationEmail({ date, event, attendee });

    const emailData = {
      from: "Event Management<from>".replace("from", emailFrom),
      to: email,
      subject: "Registration Confirmation",
      html: emailHTML
    };

    this.queueService.addJob<EmailData>("email", emailData);
  }

  // generate cache key.
  private generateCacheKey({
    page,
    limit,
    eventId,
    attendeeId
  }: {
    page: number;
    limit: number;
    eventId?: string;
    attendeeId?: string;
  }): string {
    return `registrations_${eventId || ""}_${attendeeId || ""}_${page}_${limit}`;
  }
}
