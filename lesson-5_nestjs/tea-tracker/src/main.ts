import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';
import { LoggingInterceptor } from './common/interceptors/logging/logging.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  const logger = app.get(Logger);

  /* Swagger */
  const swaggerCfg = new DocumentBuilder()
    .setTitle('Tea Demo API')
    .setDescription('Tea Tracker API')
    .setVersion('1.0')
    .addTag('tea')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerCfg);
  SwaggerModule.setup('docs', app, document);

  // enable shutdown hooks
  app.enableShutdownHooks();

  app.useGlobalGuards(new ApiKeyGuard(reflector));
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
