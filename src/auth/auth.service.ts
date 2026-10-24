import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ForgotPasswordMail } from './mails/forgot-password.mail';
import { Mailer } from '@nestjs/mail';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private mailer: Mailer,
  ) {}

  async login(dto: LoginDto) {
    const user: User | null = await this.usersService.findOneForLogin(
      dto.email,
    );
    const hashedPassword: boolean = await bcrypt.compare(
      dto.password,
      user?.password ?? '',
    );

    if (!user || !hashedPassword) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      fullName: user.fullName,
    };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(dto: CreateUserDto): Promise<User> {
    const hashedPassword: string = await bcrypt.hash(dto.password, 10);

    return await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });
  }

  async getProfile(id: number): Promise<User> {
    const user: User | null = await this.usersService.findOne(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async sendResetPasswordMail(email: string): Promise<void> {
    await this.mailer.send(ForgotPasswordMail, {
      to: { address: email },
      data: { token: '' },
    });
  }
}
