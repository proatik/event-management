import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  location: string;

  @Column("int")
  maxAttendees: number;

  @CreateDateColumn()
  createdAt: Date;
}
