import { SchedulesService } from './schedules/schedules.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { RunBatch } from 'gbatchrequests';
import { google } from 'googleapis';

@Injectable()
export class AppService {
  oauth2Client;
  calendar;

  constructor(
    @Inject(forwardRef(() => SchedulesService))
    private schedulesService: SchedulesService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000',
    );

    this.calendar = google.calendar({
      version: 'v3',
      auth: this.oauth2Client,
    });
  }

  setupCalendar = async (schduleId) => {
    const data = await this.schedulesService.findOne(schduleId);
    const options = {
      resource: {
        summary: data.name,
      },
    };
    const createdCalendar = await this.calendar.calendars.insert(options);
    const calendarId = createdCalendar.data.id;
    const events = data.events.map((event: any) => {
      delete event.id;
      event.summary = event.summary.name;
      return event;
    });
    const eventsBatch = {
      accessToken: this.oauth2Client.credentials.access_token,
      api: { name: 'calendar', version: 'v3' },
      requests: events.map((e) => ({
        method: 'POST',
        endpoint: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        requestBody: e,
      })),
    };
    await RunBatch(eventsBatch)
      .then((res) => res)
      .catch((err) => err);
  };

  async token(scheduleId: string, code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    await this.oauth2Client.setCredentials(tokens);
    await this.setupCalendar(scheduleId);
  }
}
