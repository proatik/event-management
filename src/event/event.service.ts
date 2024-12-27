import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Injectable,
  NotFoundException,
  BadRequestException
} from "@nestjs/common";

// type.
import { GetEventsResponse } from "./type";

// entity
import { Event } from "./entity/event.entity";

// service.
import { CacheService } from "src/cache/cache.service";

// dto.
import { GetEventsQueryDto } from "./dto/get-events.dto";
import { CreateEventBodyDto } from "./dto/create-event.dto";
import { UpdateEventBodyDto } from "./dto/update-event.dto";

// utility function.
import { getDatePart } from "src/util/date";

@Injectable()
export class EventService {
  constructor(
    private readonly cacheManager: CacheService,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>
  ) {}

  // create an event.
  async createEvent(createEventDto: CreateEventBodyDto): Promise<Event> {
    const { date } = createEventDto;

    const overlappingEvent = await this.eventRepository
      .createQueryBuilder("event")
      .where("DATE(event.date) = DATE(:date)", { date })
      .getOne();

    if (overlappingEvent) {
      throw new BadRequestException("an event already exists on this date");
    }

    // Create and save the event
    const event = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(event);
  }

  // get all events with search and pagination.
  async getEvents(getEventsDto: GetEventsQueryDto): Promise<GetEventsResponse> {
    const { startDate, endDate, page = 1, limit = 10 } = getEventsDto;

    const cacheKey = this.generateCacheKey({ startDate, endDate, page, limit });
    const cachedValue = await this.cacheManager.get(cacheKey);

    if (cachedValue) {
      return cachedValue;
    }

    const query = this.eventRepository.createQueryBuilder("event");

    if (startDate) {
      query.andWhere("DATE(event.date) >= DATE(:startDate)", { startDate });
    }

    if (endDate) {
      query.andWhere("DATE(event.date) <= DATE(:endDate)", { endDate });
    }

    const [events, totalEvents] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const response: GetEventsResponse = {
      events,
      totalEvents
    };

    if (totalEvents > 0) {
      response.limit = limit;
      response.currentPage = page;
      response.totalPages = Math.ceil(totalEvents / limit);
    }

    await this.cacheManager.set(cacheKey, response);

    return response;
  }

  // get an event by id.
  async getEvent(id: string): Promise<Event> {
    const event = await this.eventRepository.findOneBy({ id });

    if (!event) {
      throw new NotFoundException("event with given id doesn't exist");
    }

    return event;
  }

  // update an event by id.
  async updateEvent(
    id: string,
    updateEventDto: UpdateEventBodyDto
  ): Promise<Event> {
    const { date } = updateEventDto;
    const event = await this.getEvent(id);

    const overlappingEvent = getDatePart(date) === getDatePart(event.date);

    if (overlappingEvent) {
      throw new BadRequestException("an event already exists on this date");
    }

    Object.assign(event, updateEventDto);

    return this.eventRepository.save(event);
  }

  // delete an event by id.
  async deleteEvent(id: string): Promise<void> {
    const result = await this.eventRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException("event with given id doesn't exist");
    }
  }

  // generate cache key.
  private generateCacheKey({
    page,
    limit,
    endDate,
    startDate
  }: {
    page: number;
    limit: number;
    endDate?: Date;
    startDate?: Date;
  }): string {
    const sd = startDate ? getDatePart(startDate) : "";
    const ed = endDate ? getDatePart(endDate) : "";

    return `events_${sd}_${ed}_${page}_${limit}`;
  }
}
