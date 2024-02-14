import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! -- API v1';
  }

  getHelloV2(): string {
    return 'Hello World! -- API v2';
  }
}
