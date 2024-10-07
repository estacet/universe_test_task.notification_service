import { Module } from '@nestjs/common';
import { UserEventsModule } from './userEvents/userEvents.module';
import { ConfigModule } from '@nestjs/config';
import { PushNotificator } from './pushNotificator/types';
import { PushNotificatorModule } from './pushNotificator/pushNotificator.module';

@Module({
  imports: [
    UserEventsModule,
    PushNotificatorModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
