import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';

// TODO: 나중에 PaginationDTO
export class ResponseArrayDto<T> {
  @ApiProperty()
  data: T[];
}

export const ApiResponseArrayDto = <T extends Type<any>>(data: T) => {
  return applyDecorators(
    ApiExtraModels(ResponseArrayDto, data),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseArrayDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(data) },
              },
            },
          },
        ],
      },
    }),
  );
};
