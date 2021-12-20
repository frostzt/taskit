import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    const { email, password } = authCredentialsDto;

    // Hashing
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = this.create({
      email,
      password: hashedPassword,
    });

    try {
      await this.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      console.error(error);
      throw new InternalServerErrorException();
    }

    return;
  }
}
