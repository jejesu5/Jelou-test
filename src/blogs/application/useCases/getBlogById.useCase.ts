import { BlogService } from '../../infraestructure/services/blog.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { catchConstructor } from '../../../shared/error-handle/catchConstructor';
import { Logger } from '@nestjs/common';

@Injectable()
export class getBlogByIdUseCase {
  constructor(
    private readonly blogService: BlogService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(blogId: string) {
    try {
      const blog = await this.blogService.findBlogById(blogId);

      if (!blog) {
        throw new NotFoundException('Blog not found');
      }

      return {
        message: 'Blog found',
        data: blog,
      };
    } catch (error) {
      this.logger.error(error);
      catchConstructor(error);
    }
  }
}
