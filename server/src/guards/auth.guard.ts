import { google } from 'googleapis';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

const client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const idToken = request.cookies.token;

    if (!idToken) {
      return false;
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    if (!ticket) {
      return false;
    }

    const payload = ticket.getPayload();
    const email = payload.email;

    const validEmails: string | string[] = process.env.VALID_EMAILS.split(',');

    if (!validEmails.includes(email)) {
      return false;
    }

    return true;
  }
}
