import { IsNotEmpty, IsString } from 'class-validator';
import { Column, PrimaryGeneratedColumn, Entity, Unique } from 'typeorm';

@Entity('teacher')
@Unique('unique_name', ['name'])
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  name: string;
}
