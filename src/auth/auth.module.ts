import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { AppConfigModule, AppConfigService } from 'src/app-config';

@Module({
  imports: [
    AppConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => {
        return {
          global: true,
          secret: config.JWT_TOKEN,
          signOptions: { expiresIn: '1h' },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    TokenService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
