import { Interval } from "@nestjs/schedule";
import { Injectable, Logger } from "@nestjs/common";

// type.
import { EmailData } from "src/email/type";

// service.
import { EmailService } from "src/email/email.service";

// enum for interval time.
export enum IntervalTime {
  ONE_MINUTE = 1 * 60 * 1000,
  TOW_MINUTES = 2 * 60 * 1000,
  THREE_MINUTES = 3 * 60 * 1000,
  FOUR_MINUTES = 4 * 60 * 1000,
  FIVE_MINUTES = 5 * 60 * 1000
}

@Injectable()
export class QueueService {
  private queue: { type: string; data: any }[] = [];
  private readonly logger = new Logger(QueueService.name);

  constructor(private readonly emailService: EmailService) {}

  // add a job to the queue.
  addJob<T>(type: string, data: T) {
    this.logger.log(`adding ${type} job to the queue ⌛`);
    this.queue.push({ type, data });
  }

  // NOTE: this interval is configurable.
  // NOTE: currently it runs in every minute.
  @Interval(IntervalTime.ONE_MINUTE)
  private async processQueue() {
    const jobs = this.queue.length;

    if (jobs === 0) {
      return;
    }

    const quantifier = jobs === 1 ? "job" : "jobs";

    this.logger.log(`processing ${jobs} ${quantifier} 🛠️`);

    while (this.queue.length > 0) {
      const job = this.queue.shift();

      try {
        switch (job.type) {
          case "email":
            await this.processEmailJob(job.data);
            break;

          default:
            this.logger.warn("unknown job type ⚠️");
        }
      } catch (error) {
        this.logger.error(`failed to process ${job.type} job ❌`);
      }
    }
  }

  // process email job.
  private async processEmailJob(emailData: EmailData) {
    await this.emailService.sendEmail(emailData);
  }
}
