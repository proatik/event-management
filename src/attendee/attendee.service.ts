import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Injectable,
  NotFoundException,
  ConflictException
} from "@nestjs/common";

// type.
import { GetAttendeesResponse } from "./type";

// entity.
import { Attendee } from "./entity/attendee.entity";

// service.
import { CacheService } from "src/cache/cache.service";

// dto.
import { GetAttendeesQueryDto } from "./dto/get-attendees.dto";
import { CreateAttendeeBodyDto } from "./dto/create-attendee.dto";
import { UpdateAttendeeBodyDto } from "./dto/update-attendee.dto";

@Injectable()
export class AttendeeService {
  constructor(
    private readonly cacheManager: CacheService,

    @InjectRepository(Attendee)
    private readonly attendeeRepository: Repository<Attendee>
  ) {}

  // create an attendee.
  async createAttendee(
    createAttendeeDto: CreateAttendeeBodyDto
  ): Promise<Attendee> {
    const existingAttendee = await this.attendeeRepository.findOneBy({
      email: createAttendeeDto.email
    });

    if (existingAttendee) {
      throw new ConflictException("attendee with this email already exists");
    }

    const attendee = this.attendeeRepository.create(createAttendeeDto);

    return this.attendeeRepository.save(attendee);
  }

  // get all attendees with search and pagination.
  async getAttendees(
    getAttendeesDto: GetAttendeesQueryDto
  ): Promise<GetAttendeesResponse> {
    const { name, email, page = 1, limit = 10 } = getAttendeesDto;

    const cacheKey = this.generateCacheKey({ name, email, page, limit });
    const cachedValue = await this.cacheManager.get(cacheKey);

    if (cachedValue) {
      return cachedValue;
    }

    const query = this.attendeeRepository.createQueryBuilder("attendee");

    if (name) {
      query.andWhere("LOWER(attendee.name) LIKE LOWER(:name)", {
        name: `%${name}%`
      });
    }

    if (email) {
      query.andWhere("LOWER(attendee.email) LIKE LOWER(:email)", {
        email: `%${email}%`
      });
    }

    const [attendees, totalAttendees] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const response: GetAttendeesResponse = {
      attendees,
      totalAttendees
    };

    if (totalAttendees > 0) {
      response.limit = limit;
      response.currentPage = page;
      response.totalPages = Math.ceil(totalAttendees / limit);
    }

    await this.cacheManager.set(cacheKey, response);

    return response;
  }

  // get an attendee by id.
  async getAttendee(id: string): Promise<Attendee> {
    const attendee = await this.attendeeRepository.findOneBy({ id });

    if (!attendee) {
      throw new NotFoundException("attendee with given id doesn't exist");
    }

    return attendee;
  }

  // update an attendee by id.
  async updateAttendee(
    id: string,
    updateAttendeeDto: UpdateAttendeeBodyDto
  ): Promise<Attendee> {
    const { email } = updateAttendeeDto;
    const attendee = await this.getAttendee(id);

    if (attendee.email === email) {
      throw new ConflictException("attendee with this email already exists");
    }

    Object.assign(attendee, updateAttendeeDto);

    return this.attendeeRepository.save(attendee);
  }

  // delete an attendee by id.
  async deleteAttendee(id: string): Promise<void> {
    const result = await this.attendeeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException("attendee with given id doesn't exist");
    }
  }

  // generate cache key.
  private generateCacheKey({
    page,
    name,
    email,
    limit
  }: {
    page: number;
    limit: number;
    name?: string;
    email?: string;
  }): string {
    return `attendees_${name || ""}_${email || ""}_${page}_${limit}`;
  }
}
