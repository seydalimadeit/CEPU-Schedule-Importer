import { RRule } from 'rrule';
import { ClassesService } from './../classes/classes.service';
import { TeachersService } from './../teachers/teachers.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/domain/schedule.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { unlink } from 'fs';
import { readFile } from 'xlsx';
import * as moment from 'moment';
import { Event } from 'src/domain/event.entity';
import { Repository } from 'typeorm';

const getCellNumber = (cell) => {
  return Number(cell.replace(/\D/g, ''));
};

enum WeekDay {
  'Понедельник' = 1,
  'Вторник' = 2,
  'Среда' = 3,
  'Четверг' = 4,
  'Пятница' = 5,
}

interface EventTime {
  dateTime: string;
  timeZone?: string;
}

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @Inject(forwardRef(() => TeachersService))
    private teachersService: TeachersService,
    @Inject(forwardRef(() => ClassesService))
    private classesService: ClassesService,
  ) {}

  async create(file) {
    return await this.parseXLSX(file);
  }

  async findAll() {
    return await this.scheduleRepository.find();
  }

  async findOne(id: string) {
    return await this.scheduleRepository.findOne(id, {
      relations: ['events', 'events.summary'],
    });
  }

  async update(schedule: Schedule) {
    return await this.scheduleRepository.save(schedule);
  }

  async remove(id: string) {
    return await this.scheduleRepository.delete(id);
  }

  async parseXLSX(file) {
    const fileName = decodeURIComponent(file.originalname);

    const workbook = readFile(file.path);
    unlink(file.path, () => null);
    const sheet = workbook.Sheets['Лист1'];

    const events = [];

    const startCell = 7;
    const finishCell = 73;

    const weekDayCell = ['A'];
    const studyNumberCell = ['B'];
    const studyTimeCell = ['C'];
    const studySummaryCell = ['F', 'D', 'N', 'J', 'L', 'H', 'R', 'P'];
    const studyAudithoryCell = ['G', 'E', 'Q', 'K', 'S', 'I', 'M'];

    let weekDay;
    let studyNumber;
    let studyTime;
    let studySummary;
    let studyAudithory;

    for (const cell in sheet) {
      const cellNumber = getCellNumber(cell);
      if (cellNumber >= startCell && cellNumber <= finishCell) {
        const cellKey = cell[0];
        const value = sheet[cell].w;

        if (weekDayCell.includes(cellKey)) {
          weekDay = value;
        }

        if (studyNumberCell.includes(cellKey)) {
          studyNumber = value;
        }

        if (studyTimeCell.includes(cellKey)) {
          studyTime = value;
        }

        if (studySummaryCell.includes(cellKey)) {
          studySummary = value;
        } else {
          studySummary = null;
        }

        if (studyAudithoryCell.includes(cellKey)) {
          studyAudithory = value;
        }

        const isValid = () => {
          return (
            weekDay &&
            studyNumber &&
            studyTime &&
            studySummary &&
            studyAudithory
          );
        };

        if (isValid()) {
          const event = await this.createEvent(
            weekDay,
            studySummary,
            studyTime,
            studyAudithory,
          );

          events.push(event);
        }
      }
    }

    // save schedule
    const schedule = new Schedule();
    schedule.name = fileName;
    schedule.events = events;

    return await this.scheduleRepository.save(schedule);
  }

  public async createEvent(weekDay, studySummary, studyTime, studyAudithory) {
    const location = 'КИПУ';

    const startDay = WeekDay[weekDay.trim()];

    const hour = studyTime.split(':')[0];
    const minute = studyTime.split(':')[1];

    const startDateTime = moment()
      .set('year', new Date().getFullYear())
      .set('month', new Date().getMonth())
      .set('date', 1)
      .set('hour', hour)
      .set('minute', minute)
      .day(startDay);

    const endDateTime = startDateTime.clone().add(1.5, 'hour');

    const timeZone = 'Europe/Simferopol';

    const start: EventTime = {
      dateTime: startDateTime.format(),
      timeZone,
    };

    const end: EventTime = {
      dateTime: endDateTime.format(),
      timeZone,
    };

    const reminders = {
      useDefault: false,
      overrides: [{ method: 'popup', minutes: 10 }],
    };

    const recurrence: RRule | RRule[] | any = new RRule({
      freq: RRule.WEEKLY,
      interval: 1,
      byweekday: [RRule[this.getDay(startDay)]],
      until: new Date(2023, 6, 31),
    });

    const extendedProperties = {
      shared: { weekType: 'both' },
    };

    const event = new Event();

    const study = await this.getClass(studySummary);
    const description = await this.getDescription(studySummary, studyAudithory);

    event.summary = study;
    event.location = location;
    event.description = description;
    event.start = start;
    event.end = end;
    event.recurrence = [recurrence.toString().replace(/(\r\n|\n|\r)/gm, ';')];
    event.extendedProperties = extendedProperties;
    event.reminders = reminders;

    return await this.eventRepository.save(event);
  }

  public async getDescription(studySummary, studyAudithory) {
    let description = `Аудитория: ${studyAudithory}`;
    const descriptionRegexp = /\(([^)]+)\)/;
    const matches = descriptionRegexp.exec(studySummary);
    if (matches) {
      const teacher = descriptionRegexp.exec(studySummary)[1];
      const savedTeacher = await this.getTeacher(teacher);

      if (savedTeacher) {
        description = description.concat(
          ' | ',
          `Преподаватель: ${savedTeacher.name}`,
        );
      }
    }
    return description;
  }

  public async getTeacher(teacher) {
    if (/\s/.test(teacher)) {
      const existingTeacher = await this.teachersService.findByName(teacher);

      return existingTeacher
        ? existingTeacher
        : this.teachersService.create({ name: teacher });
    }
  }

  public async getClass(studySummary) {
    const descriptionRegexp = /\(([^)]+)\)/;
    const summary = studySummary
      .replace(descriptionRegexp, '')
      .replace(/  /g, '')
      .trim();

    const existingClass = await this.classesService.findByName(summary);

    return existingClass
      ? existingClass
      : this.classesService.create({ name: summary });
  }

  getDay = (startDay) => {
    switch (true) {
      case startDay === 1:
        return 'MO';
      case startDay === 2:
        return 'TU';
      case startDay === 3:
        return 'WE';
      case startDay === 4:
        return 'TH';
      case startDay === 5:
        return 'FR';
    }
  };
}
