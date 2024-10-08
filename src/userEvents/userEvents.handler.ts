import { Message } from '@aws-sdk/client-sqs';
import { Inject, Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { PushNotificator } from '../pushNotificator/types/';
import { NotificationBodyDto } from './dto';
import { MessageAttributeValue } from '@aws-sdk/client-sqs/dist-types/models/models_0';

@Injectable()
export class UserEventsHandler {
  constructor(
    @Inject(PushNotificator) private readonly pushNotificator: PushNotificator,
  ) {}

  @SqsMessageHandler('my_test_queue', false)
  public async handleMessage(message: Message) {
    const delayInMs: number = this.getDelayMs(message.MessageAttributes);
    const messageBody = JSON.parse(message.Body);

    const notificationBody: NotificationBodyDto = {
      deviceId: messageBody.data.deviceId,
      text: `Welcome ${messageBody.data.name}! You have been successfully registered.`,
    };

    if (delayInMs) {
      setTimeout(() => this.pushNotificator.send(notificationBody), delayInMs);
    } else {
      this.pushNotificator.send(notificationBody);
    }
  }

  private getDelayMs(
    msgAttributes: Record<string, MessageAttributeValue>,
  ): number {
    const delayHeader: MessageAttributeValue = msgAttributes['X-Delay'];
    if (!delayHeader) {
      return 0;
    }

    const delayTime = parseInt(delayHeader.StringValue);
    return delayTime;
  }
}
