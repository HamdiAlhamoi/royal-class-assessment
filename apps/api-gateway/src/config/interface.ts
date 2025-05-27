import { EnvironmentEnum } from './env.enum';

export interface IAppConfig {
  SERVER_HTTP_HOST: string;
  SERVER_HTTP_PORT: number;
  NODE_ENV: EnvironmentEnum;
}

export interface ISwaggerConfig {
  SWAGGER_API: string;
  SWAGGER_USER_NAME: string;
  SWAGGER_ALLOW: string;
  SWAGGER_PASSWORD: string;
}

export interface IRedisConfig {
  A_SVC_REDIS_HOST: string;
  A_SVC_REDIS_PORT: number;
  B_SVC_REDIS_HOST: string;
  B_SVC_REDIS_PORT: number;
}