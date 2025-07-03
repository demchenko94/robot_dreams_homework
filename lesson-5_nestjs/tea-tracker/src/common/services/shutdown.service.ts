import { Injectable, OnApplicationShutdown, Logger } from '@nestjs/common';

@Injectable()
export class ShutdownService implements OnApplicationShutdown {
  private readonly logger = new Logger(ShutdownService.name);

  onApplicationShutdown(signal?: string) {
    if (signal === 'SIGINT') {
      this.logger.log('Bye tea‑lovers 👋');
    } else {
      this.logger.log(`Application shutting down due to signal: ${signal}`);
    }
  }
}
