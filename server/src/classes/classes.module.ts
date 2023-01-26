import { Class } from './entities/class.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesModule } from './../schedules/schedules.module';
import { Module, forwardRef } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';

@Module({
  imports: [
    forwardRef(() => SchedulesModule),
    TypeOrmModule.forFeature([Class]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService],
})
export class ClassesModule {}
