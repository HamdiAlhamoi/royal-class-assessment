import { ServiceBToken } from '@app/royal-class/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ASvcController } from './a-svc.controller';
import { ASvcService } from './a-svc.service';
import { RedisEnums } from './config/env.enum';
import { appConfig, redisConfig } from './config/server.config';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, redisConfig],
      cache: true,
      isGlobal: true,
      validate,
      envFilePath: '.a.env',
    }),
    ClientsModule.registerAsync([
      {
        name: ServiceBToken,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: configService.get<string>(RedisEnums.B_SVC_REDIS_HOST, 'localhost'),
            port: configService.get<number>(RedisEnums.B_SVC_REDIS_PORT, 6379),
          },
        }),
      },
    ]),
  ],
  controllers: [ASvcController],
  providers: [ASvcService],
  exports: [ClientsModule],
})
export class ASvcModule { }
