import { Module } from '@nestjs/common';
import { PushNotificatorStubService } from './pushNotificatorStub.service';
import { PushNotificator } from './types';

@Module({
  imports: [],
  providers: [
    {
      provide: PushNotificator,
      useClass: PushNotificatorStubService,
    },
  ],
  exports: [PushNotificator],
})
export class PushNotificatorModule {}
