import { Injectable, HttpException } from '@nestjs/common';
import { UserService } from '../../infrastructure/services/user.service';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(username: string, email: string, password: string) {
    try {
      const response = await this.userService.createUser(
        username,
        email,
        password,
      );

      return {
        message: 'User created',
        user: {
          id: response._id,
          username: response.username,
          email: response.email,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 500,
          error: 'Internal Server Error',
          message: 'An error occurred while creating the user',
        },
        500,
      );
    }
  }
}
