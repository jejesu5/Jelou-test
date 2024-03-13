import { CommentService } from '../../../infraestructure/services/comment.service';
import { catchConstructor } from '../../../../shared/error-handle/catchConstructor';
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class findCommentsByUserIdUseCase {
  constructor(
    private readonly commentService: CommentService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(userId: string) {
    try {
      const comments = await this.commentService.findCommentsByUserId(userId);
      return {
        message: 'Comments found',
        data: comments,
      };
    } catch (error) {
      this.logger.error(error);
      catchConstructor(error);
    }
  }
}
