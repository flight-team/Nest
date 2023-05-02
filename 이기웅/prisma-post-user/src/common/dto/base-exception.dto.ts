import { ApiProperty } from '@nestjs/swagger';

export class BaseExceptionDto {
  @ApiProperty({ type: 'number' })
  statusCode: number;

  @ApiProperty({ type: 'string' })
  message: string;
}

export class BaseExceptionWithErrorDto extends BaseExceptionDto {
  @ApiProperty({ type: 'string' })
  error: string;
}
