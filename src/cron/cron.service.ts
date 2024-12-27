import { Repository, Between } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

// type.
import { EmailData } from "src/email/type";

// entity.
import { Event } from "src/event/entity/event.entity";
import { Registration } from "src/registration/entity/registration.entity";

// service.
import { QueueService } from "src/queue/queue.service";

// utility function.
import { getDatePart } from "src/util/date";
import { prepareRemainderEmail } from "src/email/template/eventRemainder";

@Injectable()
export class CronService {
  private checkList: Set<string> = new Set();
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly configService: ConfigService,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>
  ) {}

  // NOTE: this expression is configurable.
  // NOTE: currently it runs in every minute.
  @Cron(CronExpression.EVERY_MINUTE)
  async sendEventReminders() {
    this.logger.log("remainder cron job started 🔔");

    const now = new Date();
    const in24Hours = new Date();
    in24Hours.setHours(in24Hours.getHours() + 24);

    const events = await this.eventRepository.find({
      where: { date: Between(now, in24Hours) }
    });

    for (const { id } of events) {
      const registrations = await this.registrationRepository.find({
        where: { event: { id } },
        relations: ["attendee", "event"]
      });

      for (const { event, attendee } of registrations) {
        if (!event || !attendee) {
          break;
        }

        const { date, name: eventName } = event;
        const { email, name: attendeeName } = attendee;

        const data = {
          email,
          event: eventName,
          attendee: attendeeName,
          date: getDatePart(date)
        };

        const key = this.generateCheckListKey(data);

        if (!this.checkList.has(key)) {
          this.checkList.add(key);
          await this.sendRemainderEmail(data);
        }
      }
    }

    this.logger.log("remainder cron job completed 🔔");
  }

  // send remainder email.
  private async sendRemainderEmail({
    date,
    email,
    event,
    attendee
  }: {
    date: string;
    email: string;
    event: string;
    attendee: string;
  }) {
    const emailFrom = this.configService.get<string>("EMAIL_FROM");
    const emailHTML = prepareRemainderEmail({ date, event, attendee });

    const emailData = {
      from: "Event Management<from>".replace("from", emailFrom),
      to: email,
      subject: "Event Reminder",
      html: emailHTML
    };

    this.queueService.addJob<EmailData>("email", emailData);
  }

  // generate check-list key.
  private generateCheckListKey({
    date,
    email,
    event
  }: {
    date: string;
    email: string;
    event: string;
    attendee: string;
  }) {
    return `event_${event}_date_${date}_email_${email}`;
  }
}
