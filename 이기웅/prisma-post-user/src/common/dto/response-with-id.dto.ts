import { ApiProperty } from '@nestjs/swagger';

export class ResponseWithIdDto {
  @ApiProperty({ type: 'string' })
  id: string;
}
