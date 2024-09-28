import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @HttpCode(200)
  getHello() {}
}
