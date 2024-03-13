import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Comment, CommentDocument } from '../schemas/comments.schema';
import { BaseRepository } from '../../../shared/core/base-repository';

@Injectable()
export class CommentRepository extends BaseRepository<Comment> {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {
    super(commentModel);
  }

  async findCommentsByQuery(query: any, skip?: number, limit?: number) {
    return this.aggregate(this.pipelineBuilder(query, skip, limit));
  }

  private pipelineBuilder(query: any = {}, skip: number, limit: number) {
    const pipeline: any = [
      {
        $match: query,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creator',
        },
      },
      {
        $unwind: '$creator',
      },
      {
        $lookup: {
          from: 'blogs',
          localField: 'blog',
          foreignField: '_id',
          as: 'blog',
        },
      },
      {
        $unwind: '$blog',
      },
      {
        $project: {
          _id: 1,
          blog: 1,
          content: 1,
          creator: {
            _id: 1,
            username: 1,
            email: 1,
          },
        },
      },
    ];
    if (skip !== undefined) {
      pipeline.push({ $skip: skip });
    }
    if (limit) {
      pipeline.push({ $limit: limit });
    }
    return pipeline;
  }
}
