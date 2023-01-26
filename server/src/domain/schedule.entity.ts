import { Event } from './event.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';

@Entity('schedule')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Event, (event) => event.schedule, { cascade: true })
  events: Event[];
}
