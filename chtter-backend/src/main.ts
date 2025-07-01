import { NestFactory } from '@nestjs/core';
import { altairExpress } from 'altair-express-middleware';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');

  app.enableCors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));

  app.use(cookieParser());

  app.use(
    '/altair',
    altairExpress({
      endpointURL: '/graphql',
    }),
  );

  await app.listen(port);
}

bootstrap();
