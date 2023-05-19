import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  data: T;
}

export const ApiResponseDto = <T extends Type<any>>(data: T) => {
  return applyDecorators(
    ApiExtraModels(ResponseDto, data),
    ApiOkResponse({
      schema: {
        oneOf: [
          {
            $ref: getSchemaPath(ResponseDto),
            properties: {
              data: { type: 'object', $ref: getSchemaPath(data) },
            },
          },
        ],
      },
    }),
  );
};
