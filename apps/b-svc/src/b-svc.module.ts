import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BSvcController } from './b-svc.controller';
import { BSvcService } from './b-svc.service';
import { appConfig, redisConfig } from './config/server.config';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.b.env',
      load: [appConfig, redisConfig],
      validate,
    }),
  ],
  controllers: [BSvcController],
  providers: [BSvcService],
})
export class BSvcModule { }
