import { Injectable } from '@nestjs/common';
import { PushNotificator } from './types';
import { NotificationBodyDto } from '../userEvents/dto';

@Injectable()
export class PushNotificatorStubService implements PushNotificator {
  public send(body: NotificationBodyDto) {
    console.log(`Notification sent to ${body.deviceId}:  \n ${body.text}`);
  }
}
