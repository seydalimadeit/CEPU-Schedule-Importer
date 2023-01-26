import { SchedulesModule } from './../schedules/schedules.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef, Global } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { Teacher } from './entities/teacher.entity';

@Global()
@Module({
  imports: [
    forwardRef(() => SchedulesModule),
    TypeOrmModule.forFeature([Teacher]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
