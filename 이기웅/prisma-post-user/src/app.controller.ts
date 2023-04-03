import { Controller, Get, Res } from '@nestjs/common';

import {
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Health Check')
@Controller()
export class AppController {
  constructor() {}

  @Get()
  @ApiExcludeEndpoint()
  redirectSwagger(@Res() res: Response): void {
    res.redirect('/api');
  }

  @Get('/health')
  @ApiOperation({ summary: 'Health Check' })
  @ApiOkResponse({ description: 'Health check' })
  healthCheck() {
    return { status: 'health' };
  }
}
