import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'Nombre de usuario',
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Correo electrónico',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña',
    required: true,
  })
  @IsString()
  password: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'Correo electrónico',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña',
    required: true,
  })
  @IsString()
  password: string;
}
