import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';
export class UpdateBlogPostDto {
  @ApiProperty({
    description: 'Título del blog',
    required: true,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Contenido del blog',
    required: true,
  })
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Categoría del blog',
    required: true,
  })
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Etiquetas del blog',
    required: true,
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
