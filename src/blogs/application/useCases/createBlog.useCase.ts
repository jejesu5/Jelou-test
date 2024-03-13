import { Injectable, ConflictException } from '@nestjs/common';
import { BlogService } from '../../infraestructure/services/blog.service';
import { UserService } from '../../../users/infrastructure/services/user.service';
import { Logger } from '@nestjs/common';
import { catchConstructor } from '../../../shared/error-handle/catchConstructor';

@Injectable()
export class createBlogUseCase {
  constructor(
    private readonly blogService: BlogService,
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(
    userId: string,
    title: string,
    content: string,
    category: string,
    tags: string[],
  ) {
    try {
      const user = await this.userService.findUserById(userId);
      if (!user) {
        throw new ConflictException('User not found');
      }
      const blog = await this.blogService.createBlog(
        title,
        content,
        category,
        tags,
        userId,
      );
      return {
        message: 'Blog created',
        data: blog,
      };
    } catch (error) {
      this.logger.error(error);
      catchConstructor(error);
    }
  }
}
