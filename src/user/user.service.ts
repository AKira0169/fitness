// user.service.ts
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inject the repository directly into the service
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // Check if the user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email is already in use');
    }

    // Create and save the new user
    const result = this.userRepository.create({ email, password });

    const user = await this.userRepository.save(result);

    return {
      id: user.id,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<{ id: number; email: string }> {
    // Find the user by email
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if the password is valid (assuming `validatePassword` is a method on the User entity)
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Return the user object with the required fields
    return { id: user.id, email: user.email };
  }
}
