import { ServiceAToken } from '@app/royal-class/constants';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisEnums } from '../config/env.enum';
import { AServiceController } from './a-svc.controller';

@Module({
    imports: [
        ConfigModule,
        ClientsModule.registerAsync([
            {
                name: ServiceAToken,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.REDIS,
                    options: {
                        host: configService.get<string>(RedisEnums.A_SVC_REDIS_HOST, 'localhost'),
                        port: configService.get<number>(RedisEnums.A_SVC_REDIS_PORT, 6379),
                    },
                }),
            },
        ]),
    ],
    controllers: [AServiceController],
    exports: [ClientsModule],
})
export class AServiceClientModule { }
