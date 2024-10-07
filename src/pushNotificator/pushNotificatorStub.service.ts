import { Injectable } from '@nestjs/common';
import { PushNotificator } from './types';

@Injectable()
export class PushNotificatorStubService implements PushNotificator {
  public send(body: any) {
    console.log(body);
  }
}
