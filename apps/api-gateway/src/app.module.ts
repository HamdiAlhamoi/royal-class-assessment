import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AServiceClientModule } from './a-svc/a-service-client.module';
import { AppController } from './app.controller';
import { BServiceClientModule } from './b-svc/b-service-client.module';
import { appConfig, redisConfig, swaggerConfig } from './config/server.config';
import { validate } from './env.validation';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, swaggerConfig, redisConfig],
      cache: true,
      isGlobal: true,
      validate,
      envFilePath: '.api.env',
    }),
    AServiceClientModule, BServiceClientModule
  ],
  controllers: [AppController],
})
export class AppModule { }
