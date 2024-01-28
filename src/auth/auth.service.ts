import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    return {
      access_token: await this.tokenService.createAsync(user),
    };
  }
}
