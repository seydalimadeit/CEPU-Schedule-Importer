import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/auth/token')
  async token(
    @Query('scheduleId') scheduleId: string,
    @Query('code') code: string,
  ) {
    return await this.appService.token(scheduleId, code);
  }

  @Get('/auth/validate')
  @UseGuards(AuthGuard)
  async validateToken() {
    return null;
  }
}
