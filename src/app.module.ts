import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule, AppConfigService } from './app-config';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => {
        return {
          type: 'mysql',
          host: config.DB_HOST,
          port: config.DB_PORT,
          username: config.DB_USERNAME,
          password: config.DB_PASSWORD,
          database: config.DB_NAME,
          autoLoadEntities: true,
          synchronize: true,
          logging: true,
        };
      },
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
