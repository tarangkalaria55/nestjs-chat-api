import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TokenService } from './token.service';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UserEntity } from '../users/user.entity';
import { UserDTO } from '../users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokenService: TokenService,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const userDTO = this.classMapper.map(user, UserEntity, UserDTO);
    return {
      access_token: await this.tokenService.createAsync(userDTO),
    };
  }

  async register(username: string, password: string): Promise<UserDTO> {
    if (!!(await this.usersService.findOneByUsername(username))) {
      throw new BadRequestException('username already exists');
    }

    const user = await this.usersService.create(username, password);

    const userDTO = this.classMapper.map(user, UserEntity, UserDTO);
    return userDTO;
  }
}
