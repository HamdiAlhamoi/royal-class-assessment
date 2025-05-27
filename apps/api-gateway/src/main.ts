import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { appConfig } from './config/server.config';
import { SwaggerGenerator } from './config/swagger-generator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  app.enableCors();

  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger
  const swaggerGenerator = new SwaggerGenerator();
  await swaggerGenerator.load(app);

  const { SERVER_HTTP_HOST, SERVER_HTTP_PORT, NODE_ENV } = appConfig();
  await app.listen(SERVER_HTTP_PORT);
  console.log(
    `api-gateway Server is running on ${NODE_ENV} environment over: ${SERVER_HTTP_HOST}:${SERVER_HTTP_PORT}`
  );
}
bootstrap();
