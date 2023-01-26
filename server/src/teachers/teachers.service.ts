import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
  ) {}

  create(createTeacherDto: CreateTeacherDto) {
    return this.teacherRepository.save(createTeacherDto);
  }

  findAll() {
    return this.teacherRepository.find();
  }

  findOne(id: string) {
    return this.teacherRepository.findOne(id);
  }

  findByName(name: string) {
    return this.teacherRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  update(updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepository.save(updateTeacherDto);
  }

  remove(id: string) {
    return this.teacherRepository.delete(id);
  }
}
