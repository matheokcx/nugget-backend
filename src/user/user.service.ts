import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findOneForLogin(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email },
      select: { id: true, fullName: true, email: true, password: true },
    });
  }
}
