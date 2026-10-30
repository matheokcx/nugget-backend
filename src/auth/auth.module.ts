import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { ForgotPasswordMail } from './mails/forgot-password.mail';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResetPasswordCodeEntity } from './entities/reset-password-code.entity';
import { User } from '../user/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ForgotPasswordMail,
  ],
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '8H',
        },
      }),
      global: true,
    }),
    TypeOrmModule.forFeature([ResetPasswordCodeEntity, User]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
