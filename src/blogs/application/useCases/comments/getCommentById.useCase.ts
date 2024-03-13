import { CommentService } from '../../../infraestructure/services/comment.service';
import { catchConstructor } from '../../../../shared/error-handle/catchConstructor';
import { Logger } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class getCommentByIdUseCase {
  constructor(
    private readonly commentService: CommentService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(commentId: string) {
    try {
      const comment = await this.commentService.findCommentById(commentId);
      if (!comment) {
        throw new NotFoundException('Comment not found');
      }
      return {
        message: 'Comment found',
        data: comment,
      };
    } catch (error) {
      this.logger.error(error);
      catchConstructor(error);
    }
  }
}
