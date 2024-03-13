import { CommentService } from '../../../infraestructure/services/comment.service';
import { catchConstructor } from '../../../../shared/error-handle/catchConstructor';
import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class getAllCommentsUseCase {
  constructor(
    private readonly commentService: CommentService,
    private readonly logger: Logger,
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async execute(skip: string, limit: string) {
    try {
      const comments = await this.commentService.findAllComments(
        parseInt(skip),
        parseInt(limit),
      );
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
