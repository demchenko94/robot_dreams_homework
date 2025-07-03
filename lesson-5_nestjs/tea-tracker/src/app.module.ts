import { Logger, Module } from '@nestjs/common';
import { TeaModule } from './tea/tea.module';
import { minutes, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ShutdownService } from './common/services/shutdown.service';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: minutes(1),
          limit: 10,
        },
      ],
    }),
    TeaModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    ShutdownService,
  ],
})
export class AppModule {}
