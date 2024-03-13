import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Blog, BlogDocument } from '../schemas/blog.schema';
import { BaseRepository } from '../../../shared/core/base-repository';

@Injectable()
export class BlogRepository extends BaseRepository<Blog> {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {
    super(blogModel);
  }

  async getBlogsFullInfo(query: any, skip: number, limit: number) {
    return this.aggregate(this.pipelineBuilder(query, skip, limit));
  }

  private pipelineBuilder(
    query: any = {},
    skip: number = 0,
    limit: number = 10,
  ) {
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
        $project: {
          _id: 1,
          title: 1,
          content: 1,
          category: 1,
          tags: 1,
          createdAt: 1,
          creator: {
            _id: 1,
            username: 1,
            email: 1,
          },
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'blogId',
          as: 'comments',
        },
      },
    ];
    if (skip) {
      pipeline.push({ $skip: skip });
    }
    if (limit) {
      pipeline.push({ $limit: limit });
    }
    return pipeline;
  }
}
