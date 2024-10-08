import { NotificationBodyDto } from '../../userEvents/dto';

export interface PushNotificator {
  send(body: NotificationBodyDto);
}

export const PushNotificator = Symbol('PushNotificator');
