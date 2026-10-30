import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ConfirmResetDto } from './dto/confirm-reset.dto';
import { EmailDto } from './dto/email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  signUp(@Body() dto: CreateUserDto): Promise<User> {
    return this.authService.signup(dto);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(signInDto);
  }

  @Get('profile')
  getProfile(@Request() request: { user: { id: number } }): Promise<User> {
    return this.authService.getProfile(request.user.id);
  }

  @Post('forgot-password')
  @Public()
  async forgotPassword(@Body() body: EmailDto): Promise<void> {
    await this.authService.sendResetPasswordMail(body.email);
  }

  @Post('confirm-reset')
  @Public()
  async confirmReset(@Body() dto: ConfirmResetDto): Promise<void> {
    await this.authService.validateCode(dto);
  }

  @Patch('reset-password')
  @Public()
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
    await this.authService.resetPassword(dto);
  }
}
