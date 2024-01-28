import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { AppConfigService } from 'src/app-config';

type Payload = {
  sub: any;
  user: User;
};

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: AppConfigService,
  ) {}

  async createAsync(user: User): Promise<string> {
    const payload: Payload = { sub: user.id, user: user };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.JWT_TOKEN,
    });
    return token;
  }

  async verifyAsync(token: string): Promise<User> {
    const payload: Payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.JWT_TOKEN,
    });
    return payload.user;
  }

  extractToken(authorization?: string | null): string | undefined {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
