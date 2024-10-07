import { Message } from '@aws-sdk/client-sqs';
import { Inject, Injectable } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { PushNotificator } from '../pushNotificator/types/';

@Injectable()
export class UserEventsHandler {
  constructor(
    @Inject(PushNotificator) private readonly pushNotificator: PushNotificator,
  ) {}
  @SqsMessageHandler('my_test_queue', false)
  public async handleMessage(message: Message) {
    console.log('++++++++++++++++++', message);
    this.pushNotificator.send(message.Body);
  }
}
