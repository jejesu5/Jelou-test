import { Injectable, ConflictException } from '@nestjs/common';
import { BlogService } from '../../infraestructure/services/blog.service';
import { UserService } from '../../../users/infrastructure/services/user.service';
import { Logger } from '@nestjs/common';
import { catchConstructor } from '../../../shared/error-handle/catchConstructor';

@Injectable()
export class getBlogsByUserIdUseCase {
  constructor(
    private readonly blogService: BlogService,
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(userId: string) {
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        throw new ConflictException('User not found');
      }
      const blogs = await this.blogService.findBlogsByUserId(userId);
      return {
        message: 'Blogs found',
        data: blogs,
      };
    } catch (error) {
      this.logger.error(error);
      catchConstructor(error);
    }
  }
}
