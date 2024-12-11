import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  @Get('/health')
  checkHealth(): string {
    return 'OK';
  }
}
