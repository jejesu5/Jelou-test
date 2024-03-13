import { CommentRepository } from '../repositories/MongoDBComment.repository';
import { Injectable } from '@nestjs/common';
import { Comment } from '../../domain/comment';
import { Types } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async createComment(comment) {
    const { creator, blogId, content } = comment;
    const commentData: any = Comment.create(creator, blogId, content);
    const createdComment = await this.commentRepository.create(commentData);
    return createdComment;
  }

  async findCommentsByBlogId(blogId: string) {
    return this.commentRepository.findCommentsByQuery({
      blog: new Types.ObjectId(blogId),
    });
  }

  async findCommentById(commentId: string) {
    return this.commentRepository.findById(commentId);
  }

  async findCommentsByUserId(userId: string) {
    return this.commentRepository.findCommentsByQuery({
      creator: new Types.ObjectId(userId),
    });
  }

  async findAllComments(skip: number, limit: number) {
    const count = await this.commentRepository.countDocuments({});
    const data = await this.commentRepository.findCommentsByQuery(
      {},
      skip * limit,
      limit,
    );

    return {
      currentPage: skip,
      total: count,
      remaining: limit > count ? 0 : count - (skip * limit + limit),
      data,
    };
  }

  async updateComment(id: string, comment: any) {
    await this.commentRepository.updateOne({ _id: id }, comment);
    return this.commentRepository.findById(id);
  }

  async deleteComment(id: string) {
    return this.commentRepository.deleteOne({ _id: id });
  }
}
