import { CommentService } from '../../../infraestructure/services/comment.service';
import { BlogService } from '../../../infraestructure/services/blog.service';
import { UserService } from '../../../../users/infrastructure/services/user.service';
import { Logger } from '@nestjs/common';
import { catchConstructor } from '../../../../shared/error-handle/catchConstructor';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class createCommentUseCase {
  constructor(
    private readonly commentService: CommentService,
    private readonly blogService: BlogService,
    private readonly userService: UserService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(creator: string, blogId: string, content: string) {
    try {
      const user = await this.userService.findUserById(creator);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const blog = await this.blogService.findBlogById(blogId);
      if (!blog) {
        throw new NotFoundException('Blog not found');
      }
      const comment = await this.commentService.createComment({
        creator,
        blogId,
        content,
      });
      return {
        message: 'Comment created',
        data: comment,
      };
    } catch (error) {
      this.logger.error(error);
      catchConstructor(error);
    }
  }
}
