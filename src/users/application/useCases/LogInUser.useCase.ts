import { Injectable, ConflictException } from '@nestjs/common';
import { UserService } from '../../infrastructure/services/user.service';
import { AuthService } from '../../infrastructure/services/auth.service';

@Injectable()
export class LogInUserUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new ConflictException('Invalid credentials');
    }
    return {
      message: 'User logged in',
      id: user._id,
      token: this.authService.generateToken({
        _id: user._id.toHexString(),
      }).token,
      username: user.username,
      email: user.email,
    };
  }
}
