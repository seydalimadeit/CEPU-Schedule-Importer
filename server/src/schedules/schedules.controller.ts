import { AuthGuard } from './../guards/auth.guard';
import { Schedule } from './../domain/schedule.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  // @UseGuards(AuthGuard)
  create(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.schedulesService.create(file);
  }

  @Get()
  findAll() {
    return this.schedulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schedulesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Body() schedule: Schedule) {
    return this.schedulesService.update(schedule);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.schedulesService.remove(id);
  }
}
