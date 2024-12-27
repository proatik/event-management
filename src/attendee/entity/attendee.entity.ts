import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attendee {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}
