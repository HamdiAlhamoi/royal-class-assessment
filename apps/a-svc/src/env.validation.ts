import { IsNotEmptyString } from '@app/royal-class/decorators';
import { Type, plainToInstance } from 'class-transformer';
import { IsEnum, IsInt, IsPositive, validateSync } from 'class-validator';
import {
  EnvKeysEnum,
  EnvironmentEnum,
  RedisEnums,
} from './config/env.enum';
import { IAppConfig, IRedisConfig } from './config/interface';

export class EnvironmentVariables
  implements IAppConfig, IRedisConfig {
  @IsEnum(EnvironmentEnum)
  [EnvKeysEnum.NODE_ENV]!: EnvironmentEnum;

  @IsNotEmptyString()
  @Type(() => String)
  [RedisEnums.A_SVC_REDIS_HOST]!: string;

  @IsInt()
  @IsPositive()
  [RedisEnums.A_SVC_REDIS_PORT]!: number;

  @IsNotEmptyString()
  @Type(() => String)
  [RedisEnums.B_SVC_REDIS_HOST]!: string;

  @IsInt()
  @IsPositive()
  [RedisEnums.B_SVC_REDIS_PORT]!: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
