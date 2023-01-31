import { FetchMethods } from '@/constants/fetch';
import { AlertType } from './../constants/alert';
export interface ISchedule {
  id: string
  name: string,
  events?: IEvent[]
}

export interface IEventTime {
  dateTime: Date | string,
  timeZone: string
}

export interface IEventExtendedProperties {
  shared: {
    weekType: string
  }
}

export interface IEventReminders {
  useDefault: boolean,
  overrides: [
    {
      method: string
      minutes: number
    }
  ]
}

export interface IEventSummary {
  id?: string,
  name: string
}

export interface IEvent {
  id?: string,
  location: string,
  description: string,
  start: IEventTime,
  end: IEventTime,
  recurrence: string[] | [],
  extendedProperties: IEventExtendedProperties,
  reminders: IEventReminders,
  summary: IEventSummary
}

export interface IResponse {
  code: string
}

export interface IAlert {
  message: string, 
  type: AlertType
}