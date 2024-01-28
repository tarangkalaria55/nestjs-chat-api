import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '../app-config';
import { UserDTO } from '../users/user.dto';

type Payload = {
  sub: number;
  user: UserDTO;
};

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: AppConfigService,
  ) {}

  async createAsync(user: UserDTO): Promise<string> {
    const payload: Payload = { sub: user.id, user: user };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.JWT_TOKEN,
    });
    return token;
  }

  async verifyAsync(token: string): Promise<UserDTO> {
    const payload: Payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.JWT_TOKEN,
    });
    return payload.user;
  }

  extractToken(
    isBearer: boolean,
    authorization?: string | null,
  ): string | undefined {
    if (!isBearer) return authorization ?? undefined;
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
