import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  DATABASE_URL: string;

  @IsNumber()
  SALT: number;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;

  @IsString()
  JWT_REFRESH_TOKEN_EXPIRES_IN: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
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
