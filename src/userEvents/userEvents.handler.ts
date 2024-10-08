import { Message } from '@aws-sdk/client-sqs';
import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { PushNotificator } from '../pushNotificator/types/';
import { NotificationBodyDto } from './dto';

@Injectable()
export class UserEventsHandler {
  constructor(
    @Inject(PushNotificator) private readonly pushNotificator: PushNotificator,
  ) {}

  @SqsMessageHandler('my_test_queue', false)
  public async handleMessage(message: Message) {
    const messageBody = JSON.parse(message.Body);
    const notificationBody: NotificationBodyDto = {
      deviceId: messageBody.data.deviceId,
      text: `Welcome ${messageBody.data.name}! You have been successfully registered.`,
    };

    this.pushNotificator.send(notificationBody);
  }
}
