import { registerAs } from '@nestjs/config';
import { EnvKeysEnum, EnvironmentEnum, RedisEnums } from './env.enum';
import { IAppConfig, IRedisConfig } from './interface';

export const appConfig = registerAs(
  'app',
  (): IAppConfig => ({
    NODE_ENV: process.env[EnvKeysEnum.NODE_ENV] as EnvironmentEnum,
  })
);


export const redisConfig = registerAs(
  'redis',
  (): IRedisConfig => ({
    B_SVC_REDIS_HOST: process.env[RedisEnums.B_SVC_REDIS_HOST]!,
    B_SVC_REDIS_PORT: parseInt(process.env[RedisEnums.B_SVC_REDIS_PORT]!, 10),
  })
);