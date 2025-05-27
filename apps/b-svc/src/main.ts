import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BSvcModule } from './b-svc.module';
import { RedisEnums } from './config/env.enum';

async function bootstrap() {
  const app = await NestFactory.create(BSvcModule);
  const configService = app.get(ConfigService);

  const redisHost = configService.get<string>(RedisEnums.B_SVC_REDIS_HOST, 'localhost');
  const redisPort = configService.get<number>(RedisEnums.B_SVC_REDIS_PORT, 6379);
  const port = configService.get<number>('PORT', 3002);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: redisHost,
      port: redisPort,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);

  console.log(`b-svc running on ${port}`);
  console.log(`Connected to Redis at ${redisHost}:${redisPort}`);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap b-svc:', err);
  process.exit(1);
});
