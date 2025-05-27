import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ASvcModule } from './a-svc.module';

async function bootstrap() {
  const app = await NestFactory.create(ASvcModule);

  const configService = app.get(ConfigService);

  const redisHost = configService.get<string>('A_SVC_REDIS_HOST', 'localhost');
  const redisPort = configService.get<number>('A_SVC_REDIS_PORT', 6379);
  const port = configService.get<number>('PORT', 3001);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: redisHost,
      port: redisPort,
    },
  });

  await app.startAllMicroservices();
  await app.listen(port);
  console.log(`🚀 a-svc running on ${port}`);
}
bootstrap().catch((err) => {
  console.error('Failed to bootstrap a-svc:', err);
  process.exit(1);
});;
