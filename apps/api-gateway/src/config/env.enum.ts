export enum EnvKeysEnum {
  NODE_ENV = 'NODE_ENV',
  SERVER_HTTP_PORT = 'SERVER_HTTP_PORT',
  SERVER_HTTP_HOST = 'SERVER_HTTP_HOST',
}

export enum EnvironmentEnum {
  LOCAL = 'local',
  DEV = 'dev',
  STAGING = 'staging',
  PRODUCTION = 'prod',
}

export const SwaggerEnums = Object.freeze({
  SWAGGER_API: 'SWAGGER_API',
  SWAGGER_ALLOW: 'SWAGGER_ALLOW',
  SWAGGER_USER_NAME: 'SWAGGER_USER_NAME',
  SWAGGER_PASSWORD: 'SWAGGER_PASSWORD',
});

export const RedisEnums = Object.freeze({
  A_SVC_REDIS_HOST: 'A_SVC_REDIS_HOST',
  A_SVC_REDIS_PORT: 'A_SVC_REDIS_PORT',
  B_SVC_REDIS_HOST: 'B_SVC_REDIS_HOST',
  B_SVC_REDIS_PORT: 'B_SVC_REDIS_PORT',
});

