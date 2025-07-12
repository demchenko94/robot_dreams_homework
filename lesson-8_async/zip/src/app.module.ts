import { Module } from '@nestjs/common';
import { ZipModule } from './zip/zip.module';
import { minutes, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ZipModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: minutes(1),
          limit: 10,
        },
      ],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
