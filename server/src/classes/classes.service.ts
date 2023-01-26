import { Class } from './entities/class.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  create(createClassDto: CreateClassDto) {
    return this.classRepository.save(createClassDto);
  }

  findAll() {
    return this.classRepository.find();
  }

  findOne(id: string) {
    return this.classRepository.findOne(id);
  }

  findByName(name: string) {
    return this.classRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  update(updateClassDto: Class) {
    return this.classRepository.save(updateClassDto);
  }

  remove(id: string) {
    return this.classRepository.delete(id);
  }
}
