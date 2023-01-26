import { Class } from './../classes/entities/class.entity';
import { Schedule } from './schedule.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Class, (study) => study.events, { cascade: true })
  summary: Class;

  @Column({ name: 'location' })
  location: string;

  @Column({ name: 'description' })
  description: string;

  @Column('simple-json')
  start: {
    dateTime: string;
    timeZone?: string;
  };

  @Column('simple-json')
  end: {
    dateTime: string;
    timeZone?: string;
  };

  @Column('text', { array: true })
  recurrence: Date[] | any;

  @Column('simple-json')
  extendedProperties: {
    shared: {
      weekType: string;
    };
  };

  @Column('simple-json')
  reminders: {
    useDefault: boolean;
    overrides: any[];
  };

  @ManyToOne(() => Schedule, (schedule) => schedule.events, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  schedule: Schedule;
}
