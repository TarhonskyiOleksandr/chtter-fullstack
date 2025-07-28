import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { ChatsModule } from './chats/chats.module';
import { PubSubModule } from './common/pubsub/pubsub.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false, // disable default playground
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    DatabaseModule,
    UsersModule,
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isProd = configService.get('NODE_ENV') === 'production';

        return {
          pinoHttp: {
            transport: isProd
              ? null
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                },
            level: isProd ? 'info' : 'debug',
          },
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    ChatsModule,
    PubSubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
