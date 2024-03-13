import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './infraestructure/schemas/blog.schema';
import {
  Comment,
  CommentSchema,
} from './infraestructure/schemas/comments.schema';
import { BlogRepository } from './infraestructure/repositories/MongoDBBlogs.repository';
import { CommentRepository } from './infraestructure/repositories/MongoDBComment.repository';
import { BlogController } from './infraestructure/controllers/blog.controller';
import { BlogService } from './infraestructure/services/blog.service';
import { createBlogUseCase } from './application/useCases/createBlog.useCase';
import { UserService } from '../users/infrastructure/services/user.service';
import { getAllBlogsUseCase } from './application/useCases/getAllBlogs.useCase';
import { getBlogsByUserIdUseCase } from './application/useCases/getBlogsByUserId.useCase';
import { updateBlogUseCase } from './application/useCases/updateBlog.useCase';
import { deleteBlogUseCase } from './application/useCases/deleteBlog.useCase';
import { getBlogByIdUseCase } from './application/useCases/getBlogById.useCase';
import { createCommentUseCase } from './application/useCases/comments/createComment.useCase';
import { CommentService } from './infraestructure/services/comment.service';
import { findCommentsByBlogIdUseCase } from './application/useCases/comments/findCommentsByBlogId.useCase';
import { findCommentsByUserIdUseCase } from './application/useCases/comments/findCommentsByUserId.useCase';
import { deleteCommentUseCase } from './application/useCases/comments/deleteComment.useCase';
import { updateCommentUseCase } from './application/useCases/comments/updateComment.useCase';
import { getAllCommentsUseCase } from './application/useCases/comments/getAllComments.useCase';
import { getCommentByIdUseCase } from './application/useCases/comments/getCommentById.useCase';
import { CommentController } from './infraestructure/controllers/comment.controller';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  providers: [
    BlogRepository,
    CommentRepository,
    BlogService,
    createBlogUseCase,
    UserService,
    Logger,
    getAllBlogsUseCase,
    getBlogsByUserIdUseCase,
    updateBlogUseCase,
    deleteBlogUseCase,
    getBlogByIdUseCase,
    createCommentUseCase,
    CommentService,
    findCommentsByBlogIdUseCase,
    findCommentsByUserIdUseCase,
    deleteCommentUseCase,
    updateCommentUseCase,
    getAllCommentsUseCase,
    getCommentByIdUseCase,
    JwtService,
  ],
  controllers: [BlogController, CommentController],
  exports: [],
})
export class BlogModule {}
