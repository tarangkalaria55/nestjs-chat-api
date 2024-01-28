import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { LoginDTO, RegisterDTO } from './dto';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() postObj: LoginDTO) {
    return this.authService.signIn(postObj.username, postObj.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() postObj: RegisterDTO) {
    return this.authService.register(postObj.username, postObj.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
