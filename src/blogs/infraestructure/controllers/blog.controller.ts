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
import { createBlogUseCase } from '../../application/useCases/createBlog.useCase';
import { getAllBlogsUseCase } from '../../application/useCases/getAllBlogs.useCase';
import { updateBlogUseCase } from '../../application/useCases/updateBlog.useCase';
import { deleteBlogUseCase } from '../../application/useCases/deleteBlog.useCase';
import { getBlogsByUserIdUseCase } from '../../application/useCases/getBlogsByUserId.useCase';
import { getBlogByIdUseCase } from '../../application/useCases/getBlogById.useCase';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateBlogPostDto } from '../../application/dto/createBlog.dto';
import { UpdateBlogPostDto } from '../../application/dto/updateBlog.dto';
import { JWTGuard } from '../../../shared/guards/jwt-auth.guard';

@ApiTags('blogs')
@ApiBearerAuth()
@UseGuards(JWTGuard)
@Controller('blog')
export class BlogController {
  constructor(
    private readonly CreateBlogUseCase: createBlogUseCase,
    private readonly GetAllBlogsUseCase: getAllBlogsUseCase,
    private readonly UpdateBlogUseCase: updateBlogUseCase,
    private readonly DeleteBlogUseCase: deleteBlogUseCase,
    private readonly GetBlogsByUserIdUseCase: getBlogsByUserIdUseCase,
    private readonly GetBlogByIdUseCase: getBlogByIdUseCase,
  ) {}

  @ApiOperation({ summary: 'Create a new blog' })
  @ApiBody({ type: CreateBlogPostDto })
  @Post('/create')
  async create(@Body() body: any) {
    return this.CreateBlogUseCase.execute(
      body.userId,
      body.title,
      body.content,
      body.category,
      body.tags,
    );
  }

  @ApiOperation({ summary: 'Get all blogs' })
  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'tags', required: false })
  @Get('/all')
  async getAll(@Query() query: any) {
    return this.GetAllBlogsUseCase.execute(
      query.skip,
      query.limit,
      query.category,
      query.tags,
    );
  }

  @ApiOperation({ summary: 'Get a blog by id' })
  @Get('/:blogId')
  async getById(@Param('blogId') blogId: string) {
    return this.GetBlogByIdUseCase.execute(blogId);
  }

  @ApiOperation({ summary: 'Get blogs by user id' })
  @Get('/user/:userId')
  async getByUserId(@Param('userId') userId: string) {
    return this.GetBlogsByUserIdUseCase.execute(userId);
  }

  @ApiOperation({ summary: 'Update a blog' })
  @ApiBody({ type: UpdateBlogPostDto })
  @Put('/update/:blogId')
  async update(@Body() body: any, @Param('blogId') blogId: string) {
    const { title, content, category, tags } = body;
    return this.UpdateBlogUseCase.execute(
      blogId,
      title,
      content,
      category,
      tags,
    );
  }

  @ApiOperation({ summary: 'Delete a blog' })
  @Delete('/delete/:blogId')
  async delete(@Param('blogId') blogId: string) {
    return this.DeleteBlogUseCase.execute(blogId);
  }
}
