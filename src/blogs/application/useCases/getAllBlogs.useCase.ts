import { BlogService } from '../../infraestructure/services/blog.service';
import { Injectable } from '@nestjs/common';
import { catchConstructor } from '../../../shared/error-handle/catchConstructor';
import { Logger } from '@nestjs/common';

@Injectable()
export class getAllBlogsUseCase {
  constructor(
    private readonly blogService: BlogService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(
    skip: string,
    limit: string,
    category?: string,
    tags?: string[],
  ) {
    try {
      const blogs = await this.blogService.findAllBlogs(
        parseInt(skip),
        parseInt(limit),
        category,
        tags,
      );
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
