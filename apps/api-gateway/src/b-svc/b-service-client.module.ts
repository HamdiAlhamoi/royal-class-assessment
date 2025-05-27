import { ServiceBToken } from '@app/royal-class/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisEnums } from '../config/env.enum';
import { BServiceController } from './b-svc.controller';

@Module({
  imports: [
    ConfigModule,
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
  controllers: [BServiceController],
  exports: [ClientsModule],
})
export class BServiceClientModule { }
