import { BlogRepository } from '../repositories/MongoDBBlogs.repository';
import { Blog } from '../../domain/blog';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { IBlogUpdate } from '../../domain/interfaces/Iblog';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async createBlog(
    title: string,
    content: string,
    category: string,
    tags: string[],
    userId: string,
  ) {
    const blog: any = Blog.create(userId, title, content, category, tags);
    const createdBlog = await this.blogRepository.create(blog);
    return createdBlog;
  }

  async findBlogsByUserId(userId: string) {
    return this.blogRepository.find({ creator: new Types.ObjectId(userId) });
  }

  async findAllBlogs(
    skip: number,
    limit: number,
    category?: string,
    tags?: string[],
  ) {
    const query = {};
    if (category) {
      query['category'] = category;
    }
    if (tags) {
      query['tags'] = { $in: tags };
    }
    const count = await this.blogRepository.countDocuments(query);
    const data = await this.blogRepository.getBlogsFullInfo(
      query,
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

  async findBlogById(blogId: string) {
    return this.blogRepository.findById(blogId);
  }

  async updateBlog(blogId: string, payload: IBlogUpdate) {
    await this.blogRepository.updateOne(
      { _id: new Types.ObjectId(blogId) },
      {
        $set: payload,
      },
    );

    return this.blogRepository.findById(blogId);
  }

  async deleteBlog(blogId: string) {
    await this.blogRepository.deleteOne({ _id: new Types.ObjectId(blogId) });
  }
}
