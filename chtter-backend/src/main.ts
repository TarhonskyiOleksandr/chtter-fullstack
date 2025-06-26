import { NestFactory } from '@nestjs/core';
import { altairExpress } from 'altair-express-middleware';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');

  app.use(
    '/altair',
    altairExpress({
      endpointURL: '/graphql',
    }),
  );

  await app.listen(port);
}
bootstrap();
