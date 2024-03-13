import { BlogService } from '../../infraestructure/services/blog.service';
import { Injectable } from '@nestjs/common';
import { catchConstructor } from '../../../shared/error-handle/catchConstructor';
import { Logger } from '@nestjs/common';

@Injectable()
export class updateBlogUseCase {
  constructor(
    private readonly blogService: BlogService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(
    blogId: string,
    title?: string,
    content?: string,
    category?: string,
    tags?: string[],
  ) {
    try {
      const response = await this.blogService.updateBlog(blogId, {
        title,
        content,
        category,
        tags,
      });
      return {
        message: 'Blog updated',
        data: response,
      };
    } catch (error) {
      this.logger.error(error);
      catchConstructor(error);
    }
  }
}
