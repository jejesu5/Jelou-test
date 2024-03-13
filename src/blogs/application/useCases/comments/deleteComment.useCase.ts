import { CommentService } from '../../../infraestructure/services/comment.service';
import { catchConstructor } from '../../../../shared/error-handle/catchConstructor';
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class deleteCommentUseCase {
  constructor(
    private readonly commentService: CommentService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(commentId: string) {
    try {
      await this.commentService.deleteComment(commentId);
      return 'Comment deleted successfully';
    } catch (error) {
      this.logger.error(error);
      catchConstructor(error);
    }
  }
}
