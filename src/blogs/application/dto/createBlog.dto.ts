import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateBlogPostDto {
  @ApiProperty({
    description: 'ID del usuario',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Título del blog',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Contenido del blog',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Categoría del blog',
    required: true,
  })
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
