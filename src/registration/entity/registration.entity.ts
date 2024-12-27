import {
  Entity,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Event } from "../../event/entity/event.entity";
import { Attendee } from "../../attendee/entity/attendee.entity";

@Entity()
export class Registration {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Event, (event) => event.id)
  event: Event;

  @ManyToOne(() => Attendee, (attendee) => attendee.id)
  attendee: Attendee;

  @CreateDateColumn()
  registeredAt: Date;
}
