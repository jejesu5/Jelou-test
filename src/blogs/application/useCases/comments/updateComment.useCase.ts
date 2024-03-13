import { CommentService } from '../../../infraestructure/services/comment.service';
import { catchConstructor } from '../../../../shared/error-handle/catchConstructor';
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class updateCommentUseCase {
  constructor(
    private readonly commentService: CommentService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(commentId: string, comment: string) {
    try {
      const response = await this.commentService.updateComment(
        commentId,
        comment,
      );
      return {
        message: 'Comment updated',
        data: response,
      };
    } catch (error) {
      this.logger.error(error);
      catchConstructor(error);
    }
  }
}
