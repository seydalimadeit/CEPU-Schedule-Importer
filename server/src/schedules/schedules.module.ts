import { ClassesModule } from './../classes/classes.module';
import { TeachersModule } from './../teachers/teachers.module';
import { join, extname, parse } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { Schedule } from 'src/domain/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, BadRequestException, forwardRef } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { diskStorage } from 'multer';
import { Event } from 'src/domain/event.entity';

const getFileName = (req, file, callback) => {
  const fileExtension = extname(file.originalname);
  const fileName = parse(file.originalname).name;

  callback(null, `${fileName}-${Date.now()}${fileExtension}`);
};

const fileFilter = (req, file, callback) => {
  if (extname(file.originalname) !== '.xls') {
    return callback(new BadRequestException('File extension is not valid'));
  }

  callback(null, true);
};

@Module({
  imports: [
    forwardRef(() => TeachersModule),
    forwardRef(() => ClassesModule),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/',
        filename: getFileName,
      }),
      fileFilter: fileFilter,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    TypeOrmModule.forFeature([Schedule, Event]),
  ],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
