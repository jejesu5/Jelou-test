import {
  Controller,
  Post,
  Body,
  Query,
  Put,
  Delete,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { createCommentUseCase } from '../../application/useCases/comments/createComment.useCase';
import { findCommentsByUserIdUseCase } from '../../application/useCases/comments/findCommentsByUserId.useCase';
import { deleteCommentUseCase } from '../../application/useCases/comments/deleteComment.useCase';
import { updateCommentUseCase } from '../../application/useCases/comments/updateComment.useCase';
import { getAllCommentsUseCase } from '../../application/useCases/comments/getAllComments.useCase';
import { findCommentsByBlogIdUseCase } from '../../application/useCases/comments/findCommentsByBlogId.useCase';
import { getCommentByIdUseCase } from '../../application/useCases/comments/getCommentById.useCase';
import {
  CommentDto,
  UpdateCommentDto,
} from '../../application/dto/comments/comment.dto';
import { JWTGuard } from '../../../shared/guards/jwt-auth.guard';

@ApiTags('comments')
@ApiBearerAuth()
@UseGuards(JWTGuard)
@Controller('comment')
export class CommentController {
  constructor(
    private readonly CreateCommentUseCase: createCommentUseCase,
    private readonly FindCommentsByUserIdUseCase: findCommentsByUserIdUseCase,
    private readonly DeleteCommentUseCase: deleteCommentUseCase,
    private readonly UpdateCommentUseCase: updateCommentUseCase,
    private readonly GetAllCommentsUseCase: getAllCommentsUseCase,
    private readonly FindCommentsByBlogIdUseCase: findCommentsByBlogIdUseCase,
    private readonly GetCommentByIdUseCase: getCommentByIdUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBody({ type: CommentDto })
  @Post('/create')
  async create(@Body() body: CommentDto) {
    return this.CreateCommentUseCase.execute(
      body.creator,
      body.blog,
      body.content,
    );
  }

  @ApiOperation({ summary: 'Get all comments' })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get('/all')
  async getAll(@Query() query: any) {
    return this.GetAllCommentsUseCase.execute(query.skip, query.limit);
  }

  @ApiOperation({ summary: 'Get a comment by id' })
  @ApiParam({ name: 'commentId', required: true })
  @Get('/:commentId')
  async getById(@Param('commentId') commentId: string) {
    return this.GetCommentByIdUseCase.execute(commentId);
  }

  @ApiOperation({ summary: 'Get comments by user id' })
  @ApiParam({ name: 'userId', required: true })
  @Get('/user/:userId')
  async getByUserId(@Param('userId') userId: string) {
    return this.FindCommentsByUserIdUseCase.execute(userId);
  }

  @ApiOperation({ summary: 'Get comments by blog id' })
  @ApiParam({ name: 'blogId', required: true })
  @Get('/blog/:blogId')
  async getByBlogId(@Param('blogId') blogId: string) {
    return this.FindCommentsByBlogIdUseCase.execute(blogId);
  }

  @ApiOperation({ summary: 'Update a comment' })
  @ApiParam({ name: 'commentId', required: true })
  @ApiBody({ type: UpdateCommentDto })
  @Put('/:commentId')
  async update(@Param('commentId') commentId: string, @Body() body: any) {
    return this.UpdateCommentUseCase.execute(commentId, body);
  }

  @ApiOperation({ summary: 'Delete a comment' })
  @ApiParam({ name: 'commentId', required: true })
  @Delete('/:commentId')
  async delete(@Param('commentId') commentId: string) {
    return this.DeleteCommentUseCase.execute(commentId);
  }
}
