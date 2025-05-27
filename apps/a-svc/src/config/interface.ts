import { EnvironmentEnum } from './env.enum';

export interface IAppConfig {
  NODE_ENV: EnvironmentEnum;
}

export interface IRedisConfig {
  A_SVC_REDIS_HOST: string;
  A_SVC_REDIS_PORT: number;
  B_SVC_REDIS_HOST: string;
  B_SVC_REDIS_PORT: number;
}