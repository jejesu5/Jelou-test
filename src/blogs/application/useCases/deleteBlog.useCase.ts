import { BlogService } from '../../infraestructure/services/blog.service';
import { Injectable } from '@nestjs/common';
import { catchConstructor } from '../../../shared/error-handle/catchConstructor';
import { Logger } from '@nestjs/common';

@Injectable()
export class deleteBlogUseCase {
  constructor(
    private readonly blogService: BlogService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(blogId: string) {
    try {
      await this.blogService.deleteBlog(blogId);
      return 'Blog deleted successfully';
    } catch (error) {
      this.logger.error(error);
      catchConstructor(error);
    }
  }
}
