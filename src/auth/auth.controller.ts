import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.login(signInDto);
  }

  @Get('profile')
  getProfile(@Request() request: { user: { id: number } }) {
    return this.authService.getProfile(request.user.id);
  }
}
