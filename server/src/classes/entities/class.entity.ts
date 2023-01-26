import { IsNotEmpty, IsString } from 'class-validator';
import { Event } from 'src/domain/event.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';

@Entity('class')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @OneToMany(() => Event, (event) => event.summary, { onUpdate: 'CASCADE' })
  events: Event[];
}
