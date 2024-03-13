import { UserRepository } from '../repositories/MongoDBUser.repository';
import { User } from '../../domain/user';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(username: string, email: string, password: string) {
    const hashedPassword = this.hashPassword(password);
    const user = User.create(username, email, hashedPassword);
    const createdUser = await this.userRepository.create(user);
    return createdUser;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async findUserById(userId: string) {
    return this.userRepository.findById(new Types.ObjectId(userId));
  }

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
}
