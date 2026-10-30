import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ForgotPasswordMail } from './mails/forgot-password.mail';
import { Mailer } from '@nestjs/mail';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { ResetPasswordCodeEntity } from './entities/reset-password-code.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ConfirmResetDto } from './dto/confirm-reset.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private mailer: Mailer,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(ResetPasswordCodeEntity)
    private resetPasswordCodeRepository: Repository<ResetPasswordCodeEntity>,
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
    const uniqueCode: string = Math.floor(Math.random() * 999999)
      .toString()
      .padStart(6, '0');

    const obj: ResetPasswordCodeEntity =
      this.resetPasswordCodeRepository.create({
        code: uniqueCode,
        email: email,
        expireAt: new Date(Date.now() + 15 * 60 * 1000),
      });
    await this.resetPasswordCodeRepository.save(obj);

    await this.mailer.send(ForgotPasswordMail, {
      to: { address: email },
      data: { code: uniqueCode },
    });
  }

  async validateCode(dto: ConfirmResetDto): Promise<ResetPasswordCodeEntity> {
    const resetCode: ResetPasswordCodeEntity | null =
      await this.resetPasswordCodeRepository.findOne({
        where: {
          code: dto.code,
          email: dto.email,
        },
        order: {
          createdAt: 'DESC',
        },
      });

    if (!resetCode) {
      throw new UnauthorizedException();
    }

    if (resetCode.expireAt.getTime() < Date.now()) {
      throw new BadRequestException('Code expiré');
    }

    return resetCode;
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    const code: ResetPasswordCodeEntity = await this.validateCode(dto);
    const user: User | null = await this.usersRepository.findOneBy({
      email: dto.email,
    });

    if (!user) {
      throw new NotFoundException();
    }

    user.password = await bcrypt.hash(dto.newPassword, 10);
    await this.usersRepository.save(user);

    await this.resetPasswordCodeRepository.remove(code);
  }
}
