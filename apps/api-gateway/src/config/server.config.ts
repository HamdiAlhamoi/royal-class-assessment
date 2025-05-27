import { registerAs } from '@nestjs/config';
import { EnvKeysEnum, EnvironmentEnum, RedisEnums, SwaggerEnums } from './env.enum';
import { IAppConfig, IRedisConfig, ISwaggerConfig } from './interface';

export const appConfig = registerAs(
  'app',
  (): IAppConfig => ({
    NODE_ENV: process.env[EnvKeysEnum.NODE_ENV] as EnvironmentEnum,
    SERVER_HTTP_PORT: parseInt(process.env[EnvKeysEnum.SERVER_HTTP_PORT]!, 10),
    SERVER_HTTP_HOST: process.env[EnvKeysEnum.SERVER_HTTP_HOST]!,
  })
);

export const swaggerConfig = registerAs(
  'swagger',
  (): ISwaggerConfig => ({
    SWAGGER_API: process.env[SwaggerEnums.SWAGGER_API]!,
    SWAGGER_ALLOW: process.env[SwaggerEnums.SWAGGER_ALLOW]!,
    SWAGGER_USER_NAME: process.env[SwaggerEnums.SWAGGER_USER_NAME]!,
    SWAGGER_PASSWORD: process.env[SwaggerEnums.SWAGGER_PASSWORD]!,
  })
);

export const redisConfig = registerAs(
  'redis',
  (): IRedisConfig => ({
    A_SVC_REDIS_HOST: process.env[RedisEnums.A_SVC_REDIS_HOST]!,
    A_SVC_REDIS_PORT: parseInt(process.env[RedisEnums.A_SVC_REDIS_PORT]!, 10),
    B_SVC_REDIS_HOST: process.env[RedisEnums.B_SVC_REDIS_HOST]!,
    B_SVC_REDIS_PORT: parseInt(process.env[RedisEnums.B_SVC_REDIS_PORT]!, 10),
  })
);