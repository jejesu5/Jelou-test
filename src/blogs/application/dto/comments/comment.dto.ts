import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CommentDto {
  @ApiProperty({
    description: 'ID del creador del comentario',
    required: true,
  })
  creator: string;

  @ApiProperty({
    description: 'ID del blog al que pertenece el comentario',
    required: true,
  })
  blog: string;

  @ApiProperty({
    description: 'Contenido del comentario',
    required: true,
  })
  @IsString()
  content: string;
}

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Contenido del comentario',
    required: true,
  })
  @IsString()
  content: string;
}
