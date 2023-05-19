import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GlobalExceptionFilterDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  error: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @IsNotEmpty()
  status: number;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsString()
  message?: string;

  constructor(args: GlobalExceptionFilterDto) {
    Object.assign(this, args);
  }
}
