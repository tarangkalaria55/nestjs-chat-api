import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// DB_HOST = DESKTOP-CP3TM7O
// DB_PORT = 1433
// DB_USERNAME = sa
// DB_PASSWORD = m00ns00ns
// DB_NAME = chatdb
// JWT_TOKEN = DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.

@Injectable()
export class AppConfigService {
  constructor(private config: ConfigService) {}

  get DB_HOST() {
    return this.config.getOrThrow<string>('DB_HOST');
  }
  get DB_PORT() {
    return Number(this.config.getOrThrow<number>('DB_PORT')) || 0;
  }
  get DB_USERNAME() {
    return this.config.getOrThrow<string>('DB_USERNAME');
  }
  get DB_PASSWORD() {
    return this.config.getOrThrow<string>('DB_PASSWORD');
  }
  get DB_NAME() {
    return this.config.getOrThrow<string>('DB_NAME');
  }
  get JWT_TOKEN() {
    return this.config.getOrThrow<string>('JWT_TOKEN');
  }
}
