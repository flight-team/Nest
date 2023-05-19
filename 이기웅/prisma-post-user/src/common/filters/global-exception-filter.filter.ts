import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { GlobalExceptionFilterDto } from '../dto/global-exception-filter.dto';
import {
  BaseExceptionDto,
  BaseExceptionWithErrorDto,
} from '../dto/base-exception.dto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const status = checkIsHttpException(exception)
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const [error, message] = getMessageAndError(exception);

    const response = new GlobalExceptionFilterDto({
      error,
      message,
      status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });

    httpAdapter.reply(ctx.getResponse(), response, status);
  }
}

function checkIsHttpException(exception: unknown): exception is HttpException {
  return exception instanceof HttpException;
}

function checkIsBaseHttpException(response: any): response is BaseExceptionDto {
  return (
    'statusCode' in response && 'message' in response && !('error' in response)
  );
}

function checkIsBaseHttpExceptionWithError(
  response: any,
): response is BaseExceptionWithErrorDto {
  return (
    'statusCode' in response && 'message' in response && 'error' in response
  );
}

function getMessageAndError(exception: unknown): [string, string | undefined] {
  if (checkIsHttpException(exception)) {
    const response = exception.getResponse();

    if (checkIsBaseHttpException(response)) {
      console.log('basehttpexception');
      return [response.message, undefined];
    } else if (checkIsBaseHttpExceptionWithError(response)) {
      console.log('basehttpexceptionWithError');
      return [response.error, response.message];
    }
  }

  return ['Internal Server Error', '내부 오류가 발생하였습니다.'];
}
