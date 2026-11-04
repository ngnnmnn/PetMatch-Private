import { Controller, Get } from '@nestjs/common';

@Controller(['api/health', 'health'])
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}

