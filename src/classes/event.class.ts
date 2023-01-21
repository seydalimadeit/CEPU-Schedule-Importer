import type { IEventTime, IEventExtendedProperties, IEventReminders, IEventSummary } from '@/interfaces/interfaces';

export class ScheduleEvent {
  description: string
  end: IEventTime
  start: IEventTime
  extendedProperties: IEventExtendedProperties
  location: string
  reminders: IEventReminders
  recurrence: string[]
  summary: IEventSummary

  constructor(
    description: string,
    end: IEventTime,
    start: IEventTime,
    extendedProperties: IEventExtendedProperties,
    location: string,
    reminders: IEventReminders,
    recurrence: string[],
    summary: IEventSummary
  ) {
    this.description = description
    this.end = end
    this.start = start
    this.extendedProperties = extendedProperties
    this.location = location
    this.reminders = reminders
    this.recurrence = recurrence
    this.summary = summary
  }
}